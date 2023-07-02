import { fetchUserAuthWithCredential } from '@/src/api/auth/login';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const HALF_YEAR = (180 - 10) * 24 * 60 * 60;

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: HALF_YEAR
  },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        clientId: { type: 'text' },
        client_id: { type: 'text' },
        credential: { type: 'text' },
        select_by: { type: 'text' }
      },
      async authorize(credentials) {
        const credential = credentials as GoogleLoginResponse;

        const res = await fetchUserAuthWithCredential(credential);
        if (res) {
          return res as any;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session) {
        token = session;
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
