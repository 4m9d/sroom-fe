export default function getFormattedTime(
  time: number,
  atLeastOneMinute: boolean = false
) {
  const hour = Math.floor(time / 60);
  const minute = time % 60;
  let hourFormat = [];

  if (hour === 0 && minute === 0) {
    if (atLeastOneMinute) {
      hourFormat.push('1분');
    } else {
      hourFormat.push('0분');
    }
  }
  if (hour > 0) {
    hourFormat.push(`${hour}시간`);
  }
  if (minute > 0) {
    hourFormat.push(`${minute}분`);
  }
  return hourFormat.join(' ');
}
