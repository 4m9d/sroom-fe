export const SessionStorageKeys = {
  LECTURE_NOTES: 'lecture-notes',
  LECTURE_NOTES_IS_EDIT_MODE: 'lecture-notes-is-edit-mode',
  QUIZZES_SELECTED_ANSWER: 'quizzes-selected-answer',
} as const;

type SessionStorageKeys =
  (typeof SessionStorageKeys)[keyof typeof SessionStorageKeys];
