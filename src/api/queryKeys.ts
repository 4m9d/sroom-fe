export const QueryKeys = {
  REFRESH: 'refresh',
  CLASSROOM: 'classroom',
  SEARCH: 'search',
  DETAIL: 'lectureDetail',
  LECTURE_INDEX: 'lectureIndex',
  LECTURE_REVIEW: 'lectureReview',
  RECOMMENDATION: 'recommendation',
  COURSE_TAKING: 'courseTaking',
  COURSE_DETAIL: 'courseDetail',
  COURSE_MATERIAL: 'courseMaterial',
  LECTURENOTE: 'lectureNote',
  QUiZ: 'quiz',
  REVIEW: 'courseReview',
  MATERIAL_EXPORT: 'materialExport',
} as const;

type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
