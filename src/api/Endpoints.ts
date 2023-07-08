const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Endpoints = {
  MEMBERS: `${API_URL}/members`,
  LECTURES: `${API_URL}/lectures`
} as const;

type Endpoints = (typeof Endpoints)[keyof typeof Endpoints];
