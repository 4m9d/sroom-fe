export const QuizType = {
  MULTIPLE_CHOICE: 1,
  SHORT_ANSWER: 2,
  TRUE_OR_FALSE: 3
} as const;

export const SessionStorageKeys = {
  LECTURE_NOTES: 'lecture-notes',
  LECTURE_NOTES_IS_EDIT_MODE: 'lecture-notes-is-edit-mode',
  QUIZZES_SELECTED_ANSWER: 'quizzes-selected-answer'
} as const;

type SessionStorageKeys =
  (typeof SessionStorageKeys)[keyof typeof SessionStorageKeys];
