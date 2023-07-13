// for google login
interface Window {
  google: any;
}

interface Toast {
  id: number;
  type: 'success' | 'error';
  title: string;
  description: string;
  buttonLabel?: string;
  buttonOnClick?: () => void;
}

interface ErrorToast extends Error {
  id: number;
  title: string;
  description: string;
  type: 'error';
}

interface ToastContextType {
  toasts: Toast[];
  setToasts: Dispatch<SetStateAction<Toast[]>>;
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

interface SearchLectureParams extends Record<string, string | number> {
  keyword: string;
  limit: number;
}

interface LectureDeatilParams extends Record<string, string | number> {
  is_playlist: boolean;
  review_only?: boolean;
  index_only?: boolean;
}

interface Lecture {
  lectureTitle: string;
  description: string;
  channel: string;
  lectureCode: string;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  isPlaylist: boolean;
  isEnrolled: boolean;
}

interface SearchResultsList {
  resultPerPage: number;
  nextPageToken: string;
  prevPageToken: string;
  lectures: Lecture[];
}