import { getOffersList } from '../mock/offer.js';

export default class OffersModel {
  offers = getOffersList();

  getOffers() {
    return this.offers;
  }
}
