// for google login
interface Window {
  google: any;
}
// for dayjs
interface WeekRange {
  startOfWeek: string;
  endOfWeek: string;
}
// for channelTalk
interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}
interface BootOption {
  appearance?: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  hidePopup?: boolean;
  language?: string;
  memberHash?: string;
  memberId?: string;
  pluginKey: string;
  profile?: Profile;
  trackDefaultEvent?: boolean;
  trackUtmSource?: boolean;
  unsubscribe?: boolean;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
  zIndex?: number;
}
interface CallbackUser {
  alert: number;
  avatarUrl: string;
  id: string;
  language: string;
  memberId: string;
  name?: string;
  profile?: Profile | null;
  tags?: string[] | null;
  unsubscribeEmail: boolean;
  unsubscribeTexting: boolean;
}
interface Callback {
  (error: Error | null, user: CallbackUser | null): void;
}

//////////////////////////////////toast//////////////////////////////////

interface Emoji {
  lecture_enrollment: string;
  error: string;
  undeveloped: string;
  video_complete: string;
}

interface CustomToast {
  type: keyof Emoji;
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
  profile: string;
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
  access_expires_at: number;
}

interface ProfileUpdateResponse extends Response {
  member_id: number;
  name: string;
}

/////////////////////////////////////////////////////////////////////////

////////////////////////////////dashboards///////////////////////////////

interface Course {
  course_id: number;
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

interface WrongQuiz {
  quiz_question: string;
  quiz_answer: string;
  video_title: string;
  submitted_at: string;
}

interface DashboardInfo {
  correctness_rate: number;
  completion_rate: number;
  total_learning_time: number;
  motivation: string;
  latest_lectures: Course[];
  learning_histories: LearningHistory[];
  wrong_quizzes: WrongQuiz[];
}

interface WeekInfo {
  fullDate: string;
  date: string;
  learningHistory?: LearningHistory | undefined;
}

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////classroom/////////////////////////////////

interface ClassRoom {
  unfinished_course: number;
  completion_rate: number;
  courses: Course[];
}

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////search/////////////////////////////////

type SearchResultsFilter = 'all' | 'playlist';

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

interface Lecture {
  lecture_title: string;
  description: string;
  channel: string;
  lecture_code: string;
  rating: number;
  review_count: number;
  thumbnail: string;
  is_playlist: boolean;
  is_enrolled: boolean;
}

type PersonalizedLecture = {
  [key in
    | 'lecture_title'
    | 'description'
    | 'channel'
    | 'lecture_code'
    | 'rating'
    | 'review_count'
    | 'thumbnail'
    | 'is_playlist']: Lecture[key];
};

interface SearchResultsLecture extends Lecture {
  published_at: string;
  view_count: number;
  lecture_count: number;
}

interface SearchResultsList {
  result_per_page: number;
  next_page_token: string | null;
  prev_page_token: string | null;
  lectures: SearchResultsLecture[];
}

interface LectureIndex {
  index: number;
  thumbnail: string;
  lecture_title: string;
  duration: number;
  is_members_only: boolean;
}

interface LectureIndexList {
  index_list: LectureIndex[];
  duration?: number;
  lecture_count?: number;
}

interface LectureReview {
  index: number;
  review_content: string;
  submitted_rating: number;
  reviewer_name: string;
  published_at: string;
}

type LectureReviewList = LectureReview[];

type EnrolledCourse = {
  [key in 'course_id' | 'course_title' | 'total_video_count']: Course[key];
};

interface LectureDetail extends Lecture {
  published_at: string;
  view_count?: number;
  duration?: number;
  is_members_only?: boolean;
  indexes?: LectureIndexList;
  reviews: LectureReview[];
  courses: EnrolledCourse[];
}

interface LectureIndexParams extends Record<string, string | number | boolean> {
  index_only?: boolean;
}

interface LectureReviewParams extends Record<string, number | boolean> {
  review_only?: boolean;
  review_offset?: number;
  review_limit?: number;
}

interface LectureDeatilParams extends LectureIndexParams, LectureReviewParams {}

interface LectureRecommendations {
  general_recommendations: PersonalizedLecture[];
  channel_recommendations: PersonalizedLecture[];
  society_recommendations: PersonalizedLecture[];
  economic_recommendations: PersonalizedLecture[];
  tech_recommendations: PersonalizedLecture[];
  science_recommendations: PersonalizedLecture[];
}

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////enroll/////////////////////////////////

interface EnrollLectureInNewCourseWithoutSchedulingParams {
  lecture_code: string;
}

interface EnrollLectureInNewCourseWithSchedulingParams
  extends EnrollLectureInNewCourseWithoutSchedulingParams {
  daily_target_time: number;
  scheduling: number[];
  expected_end_date: string;
}

interface EnrollLectureInNewCourseParams {
  query: {
    use_schedule: boolean;
  };
  body?:
    | EnrollLectureInNewCourseWithoutSchedulingParams
    | EnrollLectureInNewCourseWithSchedulingParams;
}

interface EnrollLectureInExistingCourseParams
  extends EnrollLectureInNewCourseWithoutSchedulingParams {}

interface EnrollLectureResponse extends Response {
  course_id: number;
  lecture_id: number;
  title: string;
}

/////////////////////////////////////////////////////////////////////////

//////////////////////////////course-taking//////////////////////////////

interface CourseTakingPageParams {
  params: {
    course_id: string;
  };
  searchParams: {
    courseVideoId: string;
  };
}

interface Video {
  video_index: number;
  video_id: number;
  course_video_id: number;
  channel: string;
  video_title: string;
  video_code: string;
  is_completed: boolean;
  last_view_duration: number;
  video_duration: number;
}

type LastViewVideo = {
  [key in
    | 'course_video_id'
    | 'video_id'
    | 'video_title'
    | 'video_code'
    | 'channel'
    | 'last_view_duration'
    | 'is_completed']: Video[key];
};

type CurrentPlayingVideo = {
  [key in 'video_id' | 'video_code' | 'last_view_duration']: Video[key];
};

interface Section {
  section: number;
  week_duration: number;
  is_completed: boolean;
  current_week_duration: number;
  videos: Video[];
}

interface CourseDetail {
  course_id: number;
  use_schedule: boolean;
  course_title: string;
  thumbnail: string;
  channels: string;
  course_duration: number;
  current_duration: number;
  total_video_count: number;
  completed_video_count: number;
  progress: number;
  last_view_video: LastViewVideo;
  sections: Section[];
}

interface CourseTakingParams extends Record<number> {
  course_video_id: number;
  view_duration: number;
}

interface CourseTakingInfo {
  course_video_id: number;
  view_duration: number;
  is_completed: boolean;
}

/////////////////////////////////////////////////////////////////////////

/////////////////////////////course-material/////////////////////////////

type CourseMaterialType = 'lecture-notes' | 'quizzes';

interface Quiz {
  id: number;
  type: 1 | 2 | 3;
  question: string;
  options: string[];
  answer: string;
  submitted_at: string | null;
  submitted_answer: string | null;
  is_submitted: boolean;
  is_correct: boolean;
  is_scrapped: boolean;
}

interface SelectedQuizAnswer {
  id: number;
  type: 1 | 2 | 3;
  submitted_answer: string | null;
  is_submitted: boolean;
  is_correct: boolean;
  is_scrapped: boolean;
}

interface LectureNote {
  content: string;
  modified_at: string;
  is_modified: boolean;
}

interface CourseMaterials {
  status: number;
  total_quiz_count: number;
  quizzes: Quiz[];
  summary_brief: LectureNote;
}

interface updateQuizGradeParams {
  id: number;
  submitted_answer: string;
  is_correct: boolean;
}

/////////////////////////////////////////////////////////////////////////

/////////////////////////////course-review/////////////////////////////

interface ReviewableLecture {
  index: number;
  lecture_id: number;
  title: string;
  thumbnail: string;
  channel: string;
  view_duration: number;
  lecture_duration: number;
  completed_video_count: number;
  total_video_count: number;
  progress: number;
  submitted_at: string;
  content: string;
  rating: number;
  is_playlist: boolean;
  is_review_allowed: boolean;
}

interface CourseReviewResponse {
  lectures: ReviewableLecture[];
}

interface UpdateLectureReviewParams {
  submitted_rating: number;
  review_content: string;
}
