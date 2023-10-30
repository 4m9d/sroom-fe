import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends LoginResponse {
    error?: 'RefreshAccessTokenError';
  }
  interface DefaultUser {
    profile: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    session: Session;
  }
}