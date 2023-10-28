import {
  fetchUserAuthWithCredential,
  fetchUserAuthWithRefreshToken
} from '@/src/api/members/members';
import {
  ONE_MINUTE_IN_MS,
  ONE_SECOND_IN_MS,
  SESSION_AGE
} from '@/src/constants/time/time';
import getSessionExpiresAt from '@/src/util/day/getSessionExpiresAt';
import NextAuth, { AuthOptions, Awaitable, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';
import { Mutex } from 'async-mutex';
import { ErrorMessage } from '@/src/api/ErrorMessage';

const refreshingMutex = new Mutex();
let refreshingPromise: Promise<JWT> | null = null;

async function checkTokenExpiration(token: JWT) {
  const now = Math.floor(Date.now() / ONE_SECOND_IN_MS);
  const expireTime = token.session.access_expires_at;

  if (expireTime - now > 10 * 60) {
    return token;
  }

  if (refreshingPromise) {
    return await refreshingPromise;
  }

  return await refreshingMutex.runExclusive(async () => {
    if (!refreshingPromise) {
      refreshingPromise = refreshAccessToken(token).finally(() => {
        refreshingPromise = null;
      });
    }
    return refreshingPromise;
  });
}

async function refreshAccessToken(token: JWT) {
  try {
    const refreshedToken = await fetchUserAuthWithRefreshToken({
      refresh_token: token.session.refresh_token
    });

    const newToken = {
      ...token,
      session: {
        ...token.session,
        access_token: refreshedToken?.access_token,
        refresh_token: refreshedToken?.refresh_token,
        access_expires_at: refreshedToken?.access_expires_at,
        expires_at: getSessionExpiresAt()
      }
    };
    return newToken;
  } catch (err) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
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
      console.log(user);
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
        } catch (error) {
          throw new Error(ErrorMessage.REFRESH);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session = {...session, ...token.session};
      console.log('session', session);

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
