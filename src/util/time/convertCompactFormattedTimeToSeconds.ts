import { ONE_HOUR, ONE_MINUTE } from '@/src/constants/time/time';

export default function convertCompactFormattedTimeToSeconds(
  formattedTime: string
) {
  const len = formattedTime.length;

  const seconds = parseInt(formattedTime.substring(len - 2));
  const minutes = parseInt(formattedTime.substring(len - 4, len - 2));

  const hours = len > 4 ? parseInt(formattedTime.substring(0, len - 4)) : 0;

  return hours * ONE_HOUR + minutes * ONE_MINUTE + seconds;
}
