import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function getCurrentWeekRange() {
  // (0 ~ 6) : 일 ~ 토
  const currentWeekDay = dayjs().get('day');

  const startOfWeek = dayjs()
    .subtract(currentWeekDay, 'day')
    .format('YYYY-MM-DD');
  const endOfWeek = dayjs()
    .add(6 - currentWeekDay, 'day')
    .format('YYYY-MM-DD');

  return { startOfWeek, endOfWeek } as WeekRange;
}

export function getPreviousWeekRange({ startOfWeek, endOfWeek }: WeekRange) {
  const prevStartOfWeek = dayjs(startOfWeek)
    .subtract(7, 'day')
    .format('YYYY-MM-DD');
  const prevEndOfWeek = dayjs(endOfWeek)
    .subtract(7, 'day')
    .format('YYYY-MM-DD');

  return {
    startOfWeek: prevStartOfWeek,
    endOfWeek: prevEndOfWeek
  } as WeekRange;
}

export function getNextWeekRange({ startOfWeek, endOfWeek }: WeekRange) {
  const nextStartOfWeek = dayjs(startOfWeek).add(7, 'day').format('YYYY-MM-DD');
  const nextEndOfWeek = dayjs(endOfWeek).add(7, 'day').format('YYYY-MM-DD');

  return {
    startOfWeek: nextStartOfWeek,
    endOfWeek: nextEndOfWeek
  } as WeekRange;
}

export function getFullWeekDate(startOfWeek: string = '') {
  const weekInfo = [];
  const startDate = dayjs(startOfWeek);

  for (let i = 0; i < 7; i++) {
    weekInfo.push({
      fullDate: startDate.add(i, 'day').format('YYYY-MM-DD'),
      date: startDate.add(i, 'day').format('DD')
    });
  }

  return weekInfo as WeekInfo[];
}
