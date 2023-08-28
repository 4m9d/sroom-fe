export const QueryKeys = {
  REFRESH: 'refresh',
  SEARCH: 'search',
  DETAIL: 'lectureDetail',
  LECTURE_INDEX: 'lectureIndex',
  LECTURE_REVIEW: 'lectureReview',
  RECCOMENDATION: 'reccomendation'
} as const;

type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];