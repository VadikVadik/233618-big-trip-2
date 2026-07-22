import { createElement } from '../render.js';
import { isEmptyPoint } from '../utils.js';
import { DEFAULT_TYPE } from '../const.js';

const createPointOffersTemplate = (point, offers) => {
  const availableOffers = offers.find(
    ({ type }) => type === (isEmptyPoint(point) ? DEFAULT_TYPE : point.type),
  ).offers;

  if (!availableOffers.length) {
    return '<section class="event__section  event__section--offers visually-hidden"></section>';
  }

  const offersList = availableOffers
    .map(({ title, price }) => {
      const inputName = `event-offer-${title.replaceAll(' ', '-').toLowerCase()}`;
      const checkedOffer = isEmptyPoint(point)
        ? null
        : point.offers.find((offer) => offer.title === title);

      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden"
                       id="${inputName}-1"
                       type="checkbox"
                       name="${inputName}"
                       ${checkedOffer ? 'checked' : ''}>
                <label class="event__offer-label" for="${inputName}-1">
                  <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${price}</span>
                </label>
              </div>`;
    })
    .join(' ');

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${offersList}</div>
          </section>`;
};

export default class PointOffersView {
  constructor({ point, offers }) {
    this.point = point;
    this.offers = offers;
  }

  getTemplate() {
    return createPointOffersTemplate(this.point, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
