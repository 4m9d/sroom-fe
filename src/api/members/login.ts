import { Endpoints } from '../Endpoints';

export async function fetchUserAuthWithCredential(
  credential: GoogleLoginCredential
) {
  const requestBody = credential;
  const response = await fetch(Endpoints.LOGIN, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
    .then((res) => {
      if (res.ok) {
        return res.json() as Promise<LoginResponse>;
      } else {
        throw new Error('로그인에 실패했어요');
      }
    })
    .catch((err) => {
      return null;
    });

  return response;
}

export async function fetchUserAuthWithRefreshToken(
  refreshToken: RefreshToken
) {
  const requestBody = refreshToken;
  const response = await fetch(Endpoints.REFRESH, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<LoginResponse>;
    } else {
      throw new Error('세션 업데이트에 실패했어요');
    }
  });

  return response;
}
