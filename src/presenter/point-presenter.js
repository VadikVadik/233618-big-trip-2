import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import OffersPresenter from './offers-presenter.js';
import DestinationPresenter from './destination-presenter.js';

export default class PointPresenter {
  #point = null;

  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #offersList = null;
  #destinationsList = null;
  #offersPresenter = null;
  #destinationPresenter = null;
  #handleDataChange = null;

  constructor({
    pointListContainer,
    offersList,
    destinationsList,
    onDataChange,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#offersList = offersList;
    this.#destinationsList = destinationsList;
    this.#handleDataChange = onDataChange;
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

    if (this.#pointListContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (
      this.#pointListContainer.element.contains(prevEditPointComponent.element)
    ) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#offersPresenter.init();
    this.#destinationPresenter.init();
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
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
