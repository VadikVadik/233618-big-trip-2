import Observable from '../framework/observable.js';
import { getOffersList } from '../mock/offer.js';

export default class OffersModel extends Observable {
  #offers = getOffersList();

  get offers() {
    return this.#offers;
  }
}
