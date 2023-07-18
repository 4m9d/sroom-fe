import getHeaders from '@/src/util/getHeaders';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/getAuthorizedHeaders';

export async function fetchUserAuthWithCredential(
  credential: GoogleLoginCredential
) {
  const headers = getHeaders();
  const body = JSON.stringify(credential);
  return await fetch(`${Endpoints.MEMBERS}/login`, {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LoginResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.LOGIN));
    }
  })
}

export async function fetchUserAuthWithRefreshToken(
  refreshToken: RefreshToken
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(refreshToken);
  return await fetch(`${Endpoints.MEMBERS}/refresh`, {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LoginResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.REFRESH));
    }
  });
}
