import Observable from '../framework/observable.js';

const UNEXISTING_POINT_MESSAGE = 'Point is not exist';

export default class PointsModel extends Observable {
  #tripApiService = null;
  #points = [];

  constructor({ tripApiService }) {
    super();
    this.#tripApiService = tripApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map((point) => this.#adaptToClient(point));
    } catch (err) {
      this.#points = [];
    }
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(UNEXISTING_POINT_MESSAGE);
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(UNEXISTING_POINT_MESSAGE);
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      startDateTime: point['date_from'],
      endDateTime: point['date_to'],
      destinationId: point['destination'],
      price: point['base_price'],
      offersIds: point['offers'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['destination'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['offers'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
