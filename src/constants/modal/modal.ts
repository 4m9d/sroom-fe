export const ModalIDs = {
  SERVICE_GUIDE: 'service-guide-modal',
  LECTURE_DETAIL: 'lecture-detail-modal',
  LECTURE_ENROLLMENT: 'lecture-enrollment-modal',
  LECTURE_REVIEW: 'lecture-review-modal',
  SCHEDULING: 'scheduling-modal',
  COURSE_DELETE: 'course-delete-modal',
} as const;

type ModalIDs = (typeof ModalIDs)[keyof typeof ModalIDs];
