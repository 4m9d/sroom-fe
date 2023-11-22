export const ErrorMessage = {
  DEFAULT: '오류가 발생했어요',
  LOGIN: '로그인에 실패했어요',
  PROFILE_UPDATE: '프로필을 업데이트하지 못했어요',
  REFRESH: '세션 업데이트에 실패했어요',
  UNAUTHORIZED: '로그인이 필요해요',
  DASHBOARDS: '대시보드 정보를 불러오지 못했어요',
  CLASSROOM: '강의실 정보를 불러오지 못했어요',
  SEARCH: '검색 결과를 불러오지 못했어요',
  DETAIL: '강의 상세 정보를 불러오지 못했어요',
  DETAIL_INDEX: '강의 목차를 불러오지 못했어요',
  DETAIL_REVIEW: '강의 후기를 불러오지 못했어요',
  RECOMMENDATIONS: '추천 강의를 불러오지 못했어요',
  ENROLLMENT: '강의 등록에 실패했어요',
  DETAIL_COURSE: '강의 정보를 불러오지 못했어요',
  COURSE_TAKING: '강의 수강 정보를 업데이트하지 못했어요',
  COURSE_MATERIALS: '강의 자료를 불러오지 못했어요',
  LECTURENOTES: '강의 노트를 업데이트하지 못했어요',
  QUIZZES: '퀴즈 채점 결과를 업데이트하지 못했어요',
  REVIEW_LIST: '후기 정보를 불러오지 못했어요',
  REVIEW_UPDATE: '후기를 등록하지 못했어요',
  TIMESTAMP: '타임스탬프 형식이 잘못되었어요',
  MATERIAL_FEEDBACK: '피드백을 등록하지 못했어요',
} as const;

export const API_FETCH_ERROR = 'API_FETCH_ERROR'
export const SESSION_ERROR = 'SESSION_ERROR'

type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
