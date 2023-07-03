// for google login
interface Window {
  google: any;
}

interface Alert {
  type: 'success' | 'error';
  title: string;
  description: string;
  buttonLabel?: string;
  buttonOnClick?: () => void;
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

interface GoogleLoginResponse extends Response {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

interface RefreshToken {
  refreshToken: string;
}

interface LoginResponse extends Response {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  name: string;
  bio: string;
}
