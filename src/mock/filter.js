import { filter } from '../utils/filter.js';

const genereteFilter = (points) =>
  Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    points: filterPoints(points),
  }));

export { genereteFilter };
