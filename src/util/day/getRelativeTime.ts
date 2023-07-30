import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function getRelativeTime(time: string) {
  const format = {
    year: dayjs(time).diff(dayjs(), 'year'),
    month: dayjs(time).diff(dayjs(), 'month'),
    day: dayjs(time).diff(dayjs(), 'day'),
    hour: dayjs(time).diff(dayjs(), 'hour'),
    minute: dayjs(time).diff(dayjs(), 'minute')
  } as const;
  const formatKeys = Object.keys(format);

  for (let i = 0; i < formatKeys.length; i++) {
    const currFormatKey = formatKeys[i] as keyof typeof format;
    const currFormat = format[currFormatKey];

    if (currFormat !== 0) {
      return new Intl.RelativeTimeFormat('ko', {
        style: 'long',
        numeric: 'always'
      }).format(currFormat, formatKeys[i] as Intl.RelativeTimeFormatUnit);
    }
  }
}
