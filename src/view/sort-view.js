import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortItemTemplate = (type) => {
  const checked = type === 'day' ? 'checked' : '';
  const disabled = /event|offer/.test(type) ? 'disabled' : '';
  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-${type}"
                  class="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-${type}"
                  data-sort-type="${type}"
                  ${checked} ${disabled}>
            <label class="trip-sort__btn" for="sort-${type}">${type === 'offer' ? `${type}s` : type}</label>
          </div>`;
};

const createSortTemplate = () => {
  const sortItems = Object.values(SortType)
    .map((type) => createSortItemTemplate(type))
    .join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sortItems}</form>`;
};

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
