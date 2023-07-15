import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import getHeaders from './getHeaders';

export async function getAuthorizedHeaders() {
  const session: Session | null = await getSession();
  const header = getHeaders();
  header.set('Authorization', session?.accessToken ?? '');

  return header;
}
