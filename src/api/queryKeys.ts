export const QueryKeys = {
  REFRESH: 'refresh',
  CLASSROOM: 'classroom',
  SEARCH: 'search',
  DETAIL: 'lectureDetail',
  LECTURE_INDEX: 'lectureIndex',
  LECTURE_REVIEW: 'lectureReview',
  RECCOMENDATION: 'reccomendation',
  COURSE_TAKING: 'courseTaking',
  COURSE_DETAIL: 'courseDetail',
  COURSE_MATERIAL: 'courseMaterial',
  LECTURENOTE: 'lectureNote',
  QUiZ: 'quiz',
  REVIEW: 'courseReview',
} as const;

type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
