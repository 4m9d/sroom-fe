import { getServerSession } from 'next-auth/next';
import { handler as authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

function returnHeader(session: Session | null) {
  const header: HeadersInit = new Headers();
  header.set('Authorization', session?.accessToken ?? '');

  return header;
}

export async function getAuthorizationHeaderFromServer() {
  const session: Session | null = await getServerSession(authOptions);
  return returnHeader(session);
}
export async function getAuthorizationHeaderFromClient() {
  const session: Session | null = await getSession();
  return returnHeader(session);
}
