import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

const UNEXISTING_POINT_MESSAGE = 'Point is not exist';

export default class PointsModel extends Observable {
  #tripApiService = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];

  constructor({ tripApiService, offersModel, destinationsModel }) {
    super();
    this.#tripApiService = tripApiService;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await this.#destinationsModel.init();
      await this.#offersModel.init();
      const points = await this.#tripApiService.points;
      this.#points = points.map((point) => this.#adaptToClient(point));
    } catch (err) {
      return this._notify(UpdateType.FAILED);
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(UNEXISTING_POINT_MESSAGE);
    }

    try {
      const response = await this.#tripApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can not update point');
    }
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

  #getOfferById(id) {
    for (const category of this.#offersModel.offers) {
      const targetOffer = category.offers.find((offer) => offer.id === id);

      if (targetOffer) {
        return targetOffer;
      }
    }
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
      destination: this.#destinationsModel.destinations.find(
        (item) => item.id === point['destination'],
      ),
      offers: point['offers'].map((id) => this.#getOfferById(id)),
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
