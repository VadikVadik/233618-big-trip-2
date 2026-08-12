import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(duration);
dayjs.extend(isBetween);

const humanizePointDateTime = (pointDate, format) =>
  pointDate ? dayjs(pointDate).format(format) : '';

const calcDuration = (from, to) => Math.ceil(to.diff(from, 'minutes', true));

const formatDuration = (diffMinutes) => {
  if (diffMinutes === 0) {
    return '0M';
  }

  const interval = dayjs.duration(diffMinutes, 'minutes');

  const DD = interval.format('DD');
  const HH = interval.format('HH');
  const mm = interval.format('mm');

  let result = '';

  if (mm !== '00') {
    result = `${mm}M `;
  }

  if (HH !== '00') {
    result = `${HH}H ${result} `;
  }

  if (DD !== '00') {
    result = `${DD}D ${result} `;
  }

  return result.slice(0, -1);
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

const sortPointsByDate = (pointA, pointB) =>
  dayjs(pointA.startDateTime) - dayjs(pointB.startDateTime);

const sortPointsByTime = (pointA, pointB) => {
  const [durationA, durationB] = [pointA, pointB].map((point) =>
    calcDuration(dayjs(point.startDateTime), dayjs(point.endDateTime)),
  );

  return durationB - durationA;
};

const sortPointsByPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  humanizePointDateTime,
  calcDuration,
  formatDuration,
  isEmptyPoint,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
  sortPointsByDate,
  sortPointsByTime,
  sortPointsByPrice,
};
