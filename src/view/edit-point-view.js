import { createElement } from '../render.js';
import { humanizePointDateTime, isEmptyPoint } from '../utils.js';
import { EVENT_TYPES, DEFAULT_TYPE } from '../const.js';

const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

const createEventTypeListTemplate = (point) => {
  const checkedType = isEmptyPoint(point) ? DEFAULT_TYPE : point.type;

  return EVENT_TYPES.map(
    (type) =>
      `<div class="event__type-item">
        <input id="event-type-${type}-1"
               class="event__type-input  visually-hidden"
               type="radio"
               name="event-type"
               value="${type}"
               ${checkedType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`,
  ).join(' ');
};

const createOpenEventButtonTemplate = (point) => {
  if (isEmptyPoint(point)) {
    return '';
  }

  return `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`;
};

const createEditPointTemplate = (point, destinations) => {
  const { startDateTime, endDateTime, type, destination } = point;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type || DEFAULT_TYPE}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeListTemplate(point)}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type || DEFAULT_TYPE}
                    </label>
                    <input class="event__input  event__input--destination"
                           id="event-destination-1"
                           type="text"
                           name="event-destination"
                           value="${destination ? destination.title : ''}"
                           list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinations.map((dest) => `<option value="${dest.title}"></option>`).join('')}
                    </datalist>
                  </div>
                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time"
                           id="event-start-time-1"
                           type="text"
                           name="event-start-time"
                           value="${startDateTime ? humanizePointDateTime(startDateTime, DATE_TIME_FORMAT) : ''}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time"
                           id="event-end-time-1"
                           type="text"
                           name="event-end-time"
                           value="${endDateTime ? humanizePointDateTime(endDateTime, DATE_TIME_FORMAT) : ''}">
                  </div>
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price"
                           id="event-price-1"
                           type="text"
                           name="event-price"
                           value="${isEmptyPoint(point) ? '0' : point.price}">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isEmptyPoint(point) ? 'Cancel' : 'Delete'}</button>
                  ${createOpenEventButtonTemplate(point)}
                </header>
                <section class="event__details">
                </section>
              </form>
            </li>`;
};

export default class EditPointView {
  constructor({ point, destinations }) {
    this.point = point;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditPointTemplate(this.point, this.destinations);
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

  getPointData() {
    return this.point;
  }
}
