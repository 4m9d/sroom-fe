import fetchUserAuth from '@/src/api/auth/login';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
/* // for next-auth
declare module 'next-auth' {
  interface User {
    name: string;
    bio: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  }
  interface JWT {
    name: string;
    bio: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  }
  interface Session extends DefaultSession {
    user: {
      name: string;
      bio: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  }
} */

const handler = NextAuth({
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        credential: { type: 'text' }
      },
      async authorize(credentials) {
        const res = await fetchUserAuth(credentials);
        if (res) {
          return res;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.tokenType = user.tokenType;
        token.name = user.name;
        token.bio = user.bio;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.expiresIn;
      session.tokenType = token.tokenType;
      session.user.name = token.name;
      session.user.bio = token.bio;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
