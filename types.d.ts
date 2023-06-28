// for google login
interface Window {
  google: any;
}

interface Profile {
  name: string;
  bio: string;
}

interface ProfileDropdown {
  id: number;
  menuTitle: string;
  menuRoute: string;
}

interface GoogleLoginResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

interface LoginRequest {
  credential: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  name: string;
  bio: string;
}
