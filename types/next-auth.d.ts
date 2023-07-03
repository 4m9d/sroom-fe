import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession, LoginResponse {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    session: Session;
  }
}
