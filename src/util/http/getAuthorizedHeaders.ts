import { Session, getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';
import getHeaders from './getHeaders';

export async function getAuthorizedHeaders() {
  let session: Session | null = await getSession();

  if (session === null) {
    session = await getServerSession(authOptions);
  }

  const header = getHeaders();
  header.set('Authorization', session?.access_token ?? '');

  return header;
}
