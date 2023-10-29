import {
  fetchUserAuthWithCredential,
  fetchUserAuthWithRefreshToken
} from '@/src/api/members/members';
import { ONE_SECOND_IN_MS, SESSION_AGE } from '@/src/constants/time/time';
import getSessionExpiresAt from '@/src/util/day/getSessionExpiresAt';
import NextAuth, { AuthOptions, Awaitable, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';
import { Mutex } from 'async-mutex';
import NodeCache from 'node-cache';
import { ErrorMessage } from '@/src/api/ErrorMessage';

const refreshingMutex = new Mutex();
const tokenMutex = new Mutex();
const cache = new NodeCache();

let refreshingPromise: Promise<JWT> | null = null;

function getCachedToken(profile: string): JWT | null {
  const cachedToken = cache.get(`token_${profile}`) as JWT;
  return cachedToken || null;
}

function setCachedToken(profile: string, token: JWT) {
  cache.set(`token_${profile}`, token, 5);
}

async function checkTokenExpiration(token: JWT): Promise<JWT> {
  return await refreshingMutex.runExclusive(async () => {
    const now = Math.floor(Date.now() / ONE_SECOND_IN_MS);
    if (token && token.session.access_expires_at > now + 10 * 60) {
      return token;
    }

    if (!refreshingPromise) {
      refreshingPromise = refreshAccessToken(token);
    }

    const refreshedToken = await refreshingPromise;
    return refreshedToken;
  });
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const refreshedTokenData = await fetchUserAuthWithRefreshToken({
      refresh_token: token.session.refresh_token
    });

    const newToken: JWT = {
      ...token,
      session: {
        ...token.session,
        access_token: refreshedTokenData?.access_token,
        refresh_token: refreshedTokenData?.refresh_token,
        access_expires_at: refreshedTokenData?.access_expires_at,
        expires_at: getSessionExpiresAt()
      }
    };
    return newToken;
  } catch (err) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  } finally {
    refreshingPromise = null;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: SESSION_AGE
  },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        credential: { type: 'text' }
      },
      async authorize(credentials) {
        const credential = {
          credential: credentials?.credential
        } as GoogleLoginCredential;
        const response = await fetchUserAuthWithCredential(credential).then(
          (res) => res
        );
        return response as unknown as Awaitable<User | null>;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      return await tokenMutex.runExclusive(async () => {
        if (token?.session?.access_expires_at) {
          const cachedSession = getCachedToken(token.session.profile);
          if (cachedSession) {
            token.session = cachedSession;
            return token;
          }
        }

        if (trigger === 'update' && session) {
          token.session = session;
        } else if (user) {
          token.session = {
            ...user,
            expires_at: getSessionExpiresAt()
          };
        }

        if (token?.session?.access_expires_at) {
          try {
            token = await checkTokenExpiration(token);
            setCachedToken(token.session.profile, token.session);
          } catch (error) {
            throw new Error(ErrorMessage.REFRESH);
          }
        }
        return token;
      });
    },
    async session({ session, token }) {
      session = { ...session, ...token.session };
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/',
    verifyRequest: '/',
    newUser: '/'
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
