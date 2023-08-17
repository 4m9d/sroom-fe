export const weekdayList = {
  '0': 'S',
  '1': 'M',
  '2': 'T',
  '3': 'W',
  '4': 'T',
  '5': 'F',
  '6': 'S',
  '7': 'NONE'
} as const;

export type weekdayKey = keyof typeof weekdayList;
