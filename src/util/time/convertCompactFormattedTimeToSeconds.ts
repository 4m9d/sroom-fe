import { ONE_HOUR, ONE_MINUTE } from '@/src/constants/time/time';

export default function convertCompactFormattedTimeToSeconds(
  formattedTime: string
) {
  const len = formattedTime.length;

  if (len < 2 || Number.isNaN(parseInt(formattedTime.replaceAll(':', ''))))
    throw new Error();

  const [hours, minutes, seconds] = formattedTime.split(':');

  return (
    parseInt(hours) * ONE_HOUR +
    parseInt(minutes) * ONE_MINUTE +
    parseInt(seconds)
  );
}
