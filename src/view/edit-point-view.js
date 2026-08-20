import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import OffersPresenter from '../presenter/offers-presenter.js';
import DestinationPresenter from '../presenter/destination-presenter.js';
import {
  humanizePointDateTime,
  toIsoString,
  isEmptyPoint,
} from '../utils/point.js';
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

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #defaultState = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({ point, destinations, offers, onFormSubmit, onCloseClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#defaultState = this._state;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinations);
  }

  get data() {
    return this._state;
  }

  get eventDetailsElement() {
    return this.element.querySelector('.event__details');
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    if (!isEmptyPoint(this._state)) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element
      .querySelector('form')
      .addEventListener('change', this.#eventTypeToggleHandler);
    this.element
      .querySelector('form')
      .addEventListener('change', this.#offersChangeHandler);
    this.element
      .querySelector('[name="event-destination"]')
      .addEventListener('change', this.#destinatonChangeHandler);
    this.element
      .querySelector('#event-price-1')
      .addEventListener('change', this.#priceChangeHandler);
  }

  setDatepicker() {
    const datepickerOptions = {
      enableTime: true,
      time_24hr: true,
      dateFormat: 'd/m/y H:i',
      onClose: this.#startDateChangeHandler,
    };

    this.#startDatepicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      { ...datepickerOptions, defaultDate: this._state.startDateTime },
    );

    this.#endDatepicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        ...datepickerOptions,
        onClose: this.#endDateChangeHandler,
        defaultDate: this._state.endDateTime,
      },
    );
  }

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      startDateTime: toIsoString(userDate),
    });

    this.#updateView();
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      endDateTime: toIsoString(userDate),
    });

    this.#updateView();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.reset(this.#defaultState);
    this.#handleCloseClick();
  };

  #eventTypeToggleHandler = (evt) => {
    if (evt.target.name === 'event-type') {
      evt.preventDefault();
      this.updateElement({ type: evt.target.value, offers: [], offersIds: [] });
      this.#updateView();
    }
  };

  #destinatonChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find(
      (dest) => evt.target.value === dest.title,
    );

    if (newDestination) {
      this.updateElement({ destination: newDestination });
      this.#updateView();
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({ price: evt.target.value });
    this.#updateView();
  };

  #offersChangeHandler = (evt) => {
    if (evt.target.id.includes('event-offer')) {
      const offerTitle = this.element.querySelector(
        `label[for="${evt.target.id}"] span`,
      ).textContent;

      const offer = this.#offers
        .find((offers) => offers.type === this._state.type)
        .offers.find((item) => item.title === offerTitle);

      if (evt.target.checked) {
        this._state.offers.push(offer);
        this._state.offersIds.push(offer.id);
      } else {
        this._state.offers = this._state.offers.filter(
          (item) => item.id !== offer.id,
        );
        this._state.offersIds = this._state.offersIds.filter(
          (id) => id !== offer.id,
        );
      }
    }
  };

  #rerenderOffers() {
    const offersPresenter = new OffersPresenter({
      point: this,
      offers: this.#offers,
    });

    offersPresenter.init();
  }

  #rerenderDestination() {
    const destinationPresenter = new DestinationPresenter({
      point: this,
      destinations: this.#destinations,
    });

    destinationPresenter.init();
  }

  #updateView() {
    this.#rerenderOffers();
    this.#rerenderDestination();
    this.setDatepicker();
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  reset(point) {
    this.updateElement(EditPointView.parseStateToPoint(point));
  }
}
