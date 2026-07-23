import PointOffersView from '../view/point-offers-view.js';
import { render } from '../framework/render.js';

export default class OffersPresenter {
  #point = null;
  #offers = null;

  constructor({ point, offers }) {
    this.#point = point;
    this.#offers = offers;
  }

  init() {
    render(
      new PointOffersView({
        point: this.#point.data,
        offers: this.#offers,
      }),
      this.#point.element.querySelector('.event__details'),
    );
  }
}
