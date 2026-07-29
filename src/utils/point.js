import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(duration);
dayjs.extend(isBetween);

const humanizePointDateTime = (pointDate, format) =>
  pointDate ? dayjs(pointDate).format(format) : '';

const getPointDuration = (startDateTime, endDateTime) => {
  const start = dayjs(startDateTime);
  const end = dayjs(endDateTime);
  const diff = end.diff(start, 'm');

  return dayjs
    .duration(diff, 'm')
    .format('DD[D] HH[H] mm[M]')
    .split(' ')
    .filter((part) => !/00/.test(part))
    .join(' ');
};

const isEmptyPoint = (point) => !Object.entries(point).length;
const isFuturePoint = (point) =>
  dayjs(point.startDateTime).isAfter(dayjs(), 'D');

const isPresentPoint = (point) => {
  const start = dayjs(point.startDateTime);
  const end = dayjs(point.endDateTime);
  return dayjs().isBetween(start, end, 'D');
};

const isPastPoint = (point) => dayjs(point.endDateTime).isBefore(dayjs(), 'D');

export {
  humanizePointDateTime,
  getPointDuration,
  isEmptyPoint,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
};
