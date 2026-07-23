import PointDestinationView from '../view/point-destination-view.js';
import { render } from '../framework/render.js';

export default class DestinationPresenter {
  #point = null;

  constructor({ point }) {
    this.#point = point;
  }

  init() {
    render(
      new PointDestinationView({
        point: this.#point.data,
      }),
      this.#point.element.querySelector('.event__details'),
    );
  }
}
