export const ErrorMessage = {
  LOGIN: '로그인에 실패했어요',
  REFRESH: '세션 업데이트에 실패했어요',
  DASHBOARDS: '대시보드 정보를 불러오지 못했어요',
  SEARCH: '검색 결과를 불러오지 못했어요',
  DETAIL: '강의 상세 정보를 불러오지 못했어요',
  DETAIL_INDEX: '강의 목차를 불러오지 못했어요',
  DETAIL_REVIEW: '강의 후기를 불러오지 못했어요',
} as const;

type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
