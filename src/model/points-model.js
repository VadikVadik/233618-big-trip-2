import { getPoints } from '../mock/point.js';

const POINT_COUNT = 4;

export default class PointsModel {
  #points = getPoints(POINT_COUNT);

  get points() {
    return this.#points;
  }
}
