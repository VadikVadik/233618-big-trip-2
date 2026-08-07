import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import OffersPresenter from './offers-presenter.js';
import DestinationPresenter from './destination-presenter.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #mode = Mode.DEFAULT;

  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #offersList = null;
  #destinationsList = null;
  #offersPresenter = null;
  #destinationPresenter = null;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({
    pointListContainer,
    offersList,
    destinationsList,
    onDataChange,
    onModeChange,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#offersList = offersList;
    this.#destinationsList = destinationsList;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  get point() {
    return this.#point;
  }

  set point(value) {
    this.#point = value;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onOpenClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinationsList,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#closeEditPointForm,
    });

    this.#offersPresenter = new OffersPresenter({
      point: this.#editPointComponent,
      offers: this.#offersList,
    });

    this.#destinationPresenter = new DestinationPresenter({
      point: this.#editPointComponent,
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#offersPresenter.init();
    this.#destinationPresenter.init();

    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#closeEditPointForm();
  };

  #closeEditPointForm = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };
}
