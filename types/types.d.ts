// for google login
interface Window {
  google: any;
}

interface Toast {
  id?: string;
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

interface GoogleLoginResponse extends Response, GoogleLoginCredential {
  clientId: string;
  client_id: string;
  select_by: string;
}

interface GoogleLoginCredential {
  credential: string;
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
