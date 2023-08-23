import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function getCurrentDate() {
  return dayjs();
}

export function getCurrentWeekDay() {
  type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const currentWeekDay = dayjs().get('day');
  // (0 ~ 6) : 일 ~ 토

  return currentWeekDay as WeekDay;
}