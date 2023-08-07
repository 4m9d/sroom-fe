import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function getCurrentDate() {
  return dayjs();
}
