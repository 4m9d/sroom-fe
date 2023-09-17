import { fetchUserAuthWithCredential } from '@/src/api/members/members';
import { SESSION_AGE } from '@/src/constants/time/time';
import NextAuth, { AuthOptions, Awaitable, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

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
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
