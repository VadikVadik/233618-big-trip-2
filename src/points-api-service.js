import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      date_from: point.startDateTime,
      date_to: point.endDateTime,
      destination: point.destinationId,
      base_price: point.price,
      offers: point.offersIds,
      is_favorite: point.isFavorite,
    };

    delete adaptedPoint.startDateTime;
    delete adaptedPoint.endDateTime;
    delete adaptedPoint.destinationId;
    delete adaptedPoint.price;
    delete adaptedPoint.offersIds;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
