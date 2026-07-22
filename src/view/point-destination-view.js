import { createElement } from '../render.js';
import { isEmptyPoint } from '../utils.js';

const createPointDestinationTemplate = (point) => {
  if (isEmptyPoint(point)) {
    return '<section class="event__section  event__section--offers visually-hidden"></section>';
  }

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${point.destination.description}</p>
          </section>`;
};

export default class PointDestinationView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate() {
    return createPointDestinationTemplate(this.point);
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
