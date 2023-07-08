import { fetchUserAuthWithCredential } from '@/src/api/members/login';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const ONE_HOUR = 60 * 60;
const ONE_WEEK = 7 * 24 * ONE_HOUR;
const SESSION_AGE = ONE_WEEK - ONE_HOUR;

export const handler = NextAuth({
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
        const credential = credentials as GoogleLoginCredential;

        return (await fetchUserAuthWithCredential(credential)
          .then((res) => res)
          .catch(() => null)) as any;
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
      return token;
    },
    async session({ session, token }) {
      session = token.session;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
