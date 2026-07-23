import AbstractView from '../framework/view/abstract-view.js';
import { isEmptyPoint } from '../utils.js';

const createPointDestinationTemplate = (point) => {
  if (isEmptyPoint(point)) {
    return '<section class="event__section  event__section--offers visually-hidden"></section>';
  }

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${point.destination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${point.destination.photos.map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`).join('')}
              </div>
            </div>
          </section>`;
};

export default class PointDestinationView extends AbstractView {
  #point = null;

  constructor({ point }) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointDestinationTemplate(this.#point);
  }
}
