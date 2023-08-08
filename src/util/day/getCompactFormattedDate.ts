import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function getCompactDateFormat(
  date: string,
  format: '.' | '-' = '.'
) {
  return dayjs(date).format(`YYYY${format}MM${format}DD`);
}
