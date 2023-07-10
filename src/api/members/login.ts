import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';

export async function fetchUserAuthWithCredential(
  credential: GoogleLoginCredential
) {
  const requestBody = credential;
  return await fetch(Endpoints.MEMBERS, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<LoginResponse>;
    } else {
      throw new Error(ErrorMessage.login);
    }
  });
}

export async function fetchUserAuthWithRefreshToken(
  refreshToken: RefreshToken
) {
  const requestBody = refreshToken;
  return await fetch(`${Endpoints.MEMBERS}/refresh`, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<LoginResponse>;
    } else {
      throw new Error(ErrorMessage.refresh);
    }
  });
}
