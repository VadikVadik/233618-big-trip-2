import { getOffersList } from '../mock/offer.js';

export default class OffersModel {
  #offers = getOffersList();

  get offers() {
    return this.#offers;
  }
}
