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

interface LoginResponse extends Response, Profile {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

type SearchResultsFilter = 'all' | 'playlist' | 'video';

interface SearchLectureParams extends Record<string, string | number> {
  keyword: string;
  limit: number;
  next_page_token?: string;
  filter: SearchResultsFilter;
}

interface LectureDetailModalParams {
  params: { lectureCode: string };
  searchParams: { isPlaylist: string };
}

interface LectureDeatilParams extends Record<string, string | number> {
  review_only?: boolean;
  index_only?: boolean;
  next_page_token?: string;
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
  nextPageToken: string | null;
  prevPageToken: string | null;
  lectures: Lecture[];
}

interface LectureIndex {
  index: number;
  thumbnail: string;
  lectureTitle: string;
  duration: string;
}

interface LectureReview {
  index: number;
  reviewContent: string;
  submittedRating: number;
}

interface LectureDetail extends Lecture {
  publishedAt: string | null;
  lectureCount: number;
  indexInfo: {
    indexList: LectureIndex[];
    nextPageToken: string | null;
    totalDuration: stirng;
  };
  reviews: [];
  isEnrolled: boolean;
}
