import { Endpoints } from '../Endpoints';

export async function fetchUserAuthWithCredential(res: GoogleLoginResponse) {
  const requestBody = { credential: res.credential };
  const response = await fetch(Endpoints.LOGIN, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then((res) => res.json() as Promise<LoginResponse>);

  return response;
}

export async function fetchUserAuthWithRefreshToken(
  refreshToken: RefreshToken
) {
  const requestBody = refreshToken;
  const response = await fetch(Endpoints.REFRESH, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then((res) => res.json() as Promise<LoginResponse>);

  return response;
}
