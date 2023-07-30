// for google login
interface Window {
  google: any;
}
// for dayjs
interface WeekRange {
  startOfWeek: string;
  endOfWeek: string;
}

//////////////////////////////////toast//////////////////////////////////

interface CustomToast {
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
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////members/////////////////////////////////

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
  refresh_token: string;
}

interface LoginResponse extends Response, Profile {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

/////////////////////////////////////////////////////////////////////////

////////////////////////////////dashboards///////////////////////////////

interface LatestLearningLecture {
  course_id: string;
  channels: string;
  thumbnail: string;
  course_title: string;
  duration: number;
  last_view_time: string;
  total_video_count: number;
  completed_video_count: number;
  progress: number;
}

interface LearningHistory {
  date: string;
  learning_time: number;
  quiz_count: number;
  lecture_count: number;
}

interface DashboardInfo {
  correctness_rate: number;
  completion_rate: number;
  total_learning_time: number;
  motivation: string;
  latest_lectures: LatestLearningLecture[];
  learning_histories: LearningHistory[];
}

interface WeekInfo {
  fullDate: string;
  date: string;
  learningHistory?: LearningHistory | undefined;
}

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////search/////////////////////////////////

type SearchResultsFilter = 'all' | 'playlist' | 'video';

interface SearchLectureParams extends Record<string, string | number> {
  keyword: string;
  limit: number;
  next_page_token?: string;
  filter: SearchResultsFilter;
}

interface LectureDetailModalParams {
  params: { lecture_code: string };
  searchParams: { is_playlist: string };
}

interface PersonalizedLecture {
  lecture_title: string;
  description: string;
  channel: string;
  lecture_code: string;
  rating: number;
  review_count: number;
  thumbnail: string;
  is_playlist: boolean;
}

interface Lecture extends PersonalizedLecture {
  is_enrolled: boolean;
}

interface SearchResultsList {
  result_per_page: number;
  next_page_token: string | null;
  prev_page_token: string | null;
  lectures: Lecture[];
}

interface LectureIndex {
  index: number;
  thumbnail: string;
  lecture_title: string;
  duration: string;
}

interface LectureIndexList {
  index_list: LectureIndex[];
  next_page_token: string | null;
  total_duration: string;
}

interface LectureReview {
  index: number;
  review_title: string;
  review_content: string;
  submitted_rating: number;
  reviewer_name: string;
  published_at: string;
}

type LectureReviewList = LectureReview[];

interface LectureDetail extends Lecture {
  published_at: string | null;
  view_count: number;
  duration: string;
  lecture_count?: number;
  indexes?: LectureIndexList;
  reviews: LectureReview[];
}

interface LectureIndexParams extends Record<string, string | number | boolean> {
  index_only?: boolean;
  index_next_token?: string;
  index_limit?: number;
}

interface LectureReviewParams extends Record<string, number | boolean> {
  review_only?: boolean;
  review_offset?: number;
  review_limit?: number;
}

interface LectureDeatilParams extends LectureIndexParams, LectureReviewParams {}

interface LectureRecommendations {
  recommendations: PersonalizedLecture[];
}

/////////////////////////////////////////////////////////////////////////
