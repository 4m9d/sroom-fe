import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function compareIsFutureDate(date: string) {
  const today = dayjs();
  const compareDate = dayjs(date);

  return today.diff(compareDate, 'D') < 0;
}
