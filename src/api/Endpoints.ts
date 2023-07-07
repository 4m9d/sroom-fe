const MOCK_API = process.env.NEXT_PUBLIC_MOCK_API;

export const Endpoints = {
  LOGIN: `${MOCK_API}/members/login`,
  REFRESH: `${MOCK_API}/members/refresh`,
  LECTURES: `${MOCK_API}/lectures`,
}