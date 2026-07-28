import { FiterType } from '../const.js';
import { isFuturePoint, isPresentPoint, isPastPoint } from './point.js';

const filter = {
  [FiterType.EVERYTHING]: (points) => points,
  [FiterType.FUTURE]: (points) =>
    points.filter((point) => isFuturePoint(point)),
  [FiterType.PRESENT]: (points) =>
    points.filter((point) => isPresentPoint(point)),
  [FiterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

export { filter };
