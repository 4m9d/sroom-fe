export default function getCompactFormattedDuration(time: number) {
  const hour = Math.floor(time / 3600).toString();
  const minute = Math.floor((time % 3600) / 60).toString();
  const second = Math.floor((time % 3600) % 60).toString();
  let timeFormat = [];

  if (hour !== '0') {
    timeFormat.push(hour.padStart(2, '0'));
  }
  timeFormat.push(minute.padStart(2, '0'));
  timeFormat.push(second.padStart(2, '0'));
  return timeFormat.join(':');
}
