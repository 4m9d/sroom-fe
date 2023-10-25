import getHeaders from '@/src/util/http/getHeaders';
import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';

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
      return Promise.reject(
        new Error(ErrorMessage.LOGIN, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchUserAuthWithRefreshToken(
  refreshToken: RefreshToken
) {
  const headers = getHeaders();
  const body = JSON.stringify(refreshToken);
  
  return await fetch(`${Endpoints.MEMBERS}/refresh`, {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LoginResponse>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.REFRESH);
    }
  });
}

export async function updateUserProfile(name: string) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify({ name });
  return await fetch(`${Endpoints.MEMBERS}/profile`, {
    method: 'PUT',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<ProfileUpdateResponse>;
    } else {
      fetchErrorHandling(res, ErrorMessage.PROFILE_UPDATE);
    }
  });
}
