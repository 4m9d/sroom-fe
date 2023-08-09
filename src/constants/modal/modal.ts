export const ModalIDs = {
  LECTURE_DETAIL: 'lecture_detail_modal',
  LECTURE_ENROLLMENT: 'lecture_enrollment_modal',
  SCHEDULING: 'scheduling_modal',
} as const;

type ModalIDs = (typeof ModalIDs)[keyof typeof ModalIDs];