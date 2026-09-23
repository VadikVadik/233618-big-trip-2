import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #tripApiService = null;
  #offers = [];

  constructor({ tripApiService }) {
    super();
    this.#tripApiService = tripApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = this.#tripApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}
