import { fetchUserAuthWithCredential } from '@/src/api/members/login';
import { SESSION_AGE } from '@/src/constants/auth/auth';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

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
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/',
    verifyRequest: '/',
    newUser: '/'
  }
});

export { handler as GET, handler as POST };
