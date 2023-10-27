import {
  fetchUserAuthWithCredential,
  fetchUserAuthWithRefreshToken
} from '@/src/api/members/members';
import {
  ONE_MINUTE_IN_MS,
  ONE_SECOND_IN_MS,
  SESSION_AGE
} from '@/src/constants/time/time';
import NextAuth, { AuthOptions, Awaitable, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';

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
        expires_at: refreshedToken?.expires_at,
        refresh_token: refreshedToken?.refresh_token
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
      if (trigger === 'update' && session) {
        token.session = session;
      } else if (user) {
        token.session = user;
      }

      const now = Math.floor(Date.now());
      const expireTime = token.session.expires_at * ONE_SECOND_IN_MS;

      if (expireTime - now > 10 * ONE_MINUTE_IN_MS) {
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session = token.session;

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
