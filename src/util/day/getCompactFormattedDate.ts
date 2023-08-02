import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function getCompactDateFormat(date: string) {
  return dayjs(date).format('YYYY.MM.DD');
}
