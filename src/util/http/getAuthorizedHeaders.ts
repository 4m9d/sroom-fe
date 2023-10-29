import { Session, getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import getHeaders from './getHeaders';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export async function getAuthorizedHeaders() {
  return await mutex.runExclusive(async () => {
    let session: Session | null = await getSession();

    if (session === null) {
      session = await getServerSession(authOptions);
    }

    const header = getHeaders();
    header.set('Authorization', session?.access_token ?? '');

    return header;
  });
}
