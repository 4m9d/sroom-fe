import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends LoginResponse {
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    session: Session;
  }
}