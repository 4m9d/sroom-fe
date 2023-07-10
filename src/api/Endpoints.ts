const API_URL = "http://localhost:8080";
export const Endpoints = {
  MEMBERS: `${API_URL}/members`,
  LECTURES: `${API_URL}/lectures`
} as const;

type Endpoints = (typeof Endpoints)[keyof typeof Endpoints];
