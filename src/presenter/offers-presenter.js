import PointOffersView from '../view/point-offers-view.js';
import { render } from '../framework/render.js';

export default class OffersPresenter {
  #point = null;
  #offers = null;
  #offersComponent = null;

  constructor({ point, offers }) {
    this.#point = point;
    this.#offers = offers;
  }

  init() {
    if (!this.#offersComponent) {
      this.#offersComponent = new PointOffersView({
        point: this.#point.data,
        offers: this.#offers,
      });
    }

    render(
      this.#offersComponent,
      this.#point.element.querySelector('.event__details'),
    );
  }

  reset() {
    this.#offersComponent.element.remove();
  }
}
