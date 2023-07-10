export const ErrorMessage = {
  login: '로그인에 실패했어요',
  refresh: '세션 업데이트에 실패했어요',
  search: '검색 결과를 불러오지 못했어요',
  detail: '강의 상세 정보를 불러오지 못했어요'
} as const;

type ErrorMessage = (typeof ErrorMessage)[keyof typeof ErrorMessage];
