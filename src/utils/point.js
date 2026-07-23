import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

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

export { humanizePointDateTime, getPointDuration, isEmptyPoint };
