export default function getFormattedHour(time: number) {
  const hour = Math.floor(time / 60);
  const minute = time % 60;
  let hourFormat = [];

  if (hour > 0) {
    hourFormat.push(`${hour}시간`);
  }
  if (minute > 0) {
    hourFormat.push(`${minute}분`);
  }
  return hourFormat.join(' ');
}
