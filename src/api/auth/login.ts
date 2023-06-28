import { Endpoint } from '../Endpoint';

export default async function fetchUserAuth(res: GoogleLoginResponse) {
  const requestBody: LoginRequest = { credential: res.credential };
  const response = await fetch(Endpoint.LOGIN, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
    .then((res) => res.json())
    .then((res) => res as LoginResponse)
    .catch((err) => console.error(err));

  return response;
}
