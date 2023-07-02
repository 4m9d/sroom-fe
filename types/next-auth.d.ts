import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    name: string;
    bio: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    tokenType: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    session: Session;
  }
}
