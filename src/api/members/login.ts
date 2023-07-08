import { Endpoints } from '../Endpoints';

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
      throw new Error('로그인에 실패했어요');
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
      throw new Error('세션 업데이트에 실패했어요');
    }
  });
}
