export default function stringToTime(stringValue) {
  const time = stringValue.split(':');

  return {hours: time[0], minutes: time[1]};
}
