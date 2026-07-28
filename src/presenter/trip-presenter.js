import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import OffersPresenter from './offers-presenter.js';
import DestinationPresenter from './destination-presenter.js';
import { render, replace } from '../framework/render.js';

export default class TripPresenter {
  #tripListComponent = new TripListView();
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #tripPoints = null;
  #offersList = null;
  #destinationsList = null;

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#offersList = [...this.#offersModel.offers];
    this.#destinationsList = [...this.#destinationsModel.destinations];

    this.#renderTrip();
  }

  #renderTrip() {
    render(new SortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    for (const point of this.#tripPoints) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormtoPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onOpenClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editPointComponent = new EditPointView({
      point,
      destinations: this.#destinationsList,
      onFormSubmit: closeEditPointForm,
      onCloseClick: closeEditPointForm,
    });

    const offersPresenter = new OffersPresenter({
      point: editPointComponent,
      offers: this.#offersList,
    });

    const destinationPresenter = new DestinationPresenter({
      point: editPointComponent,
    });

    function closeEditPointForm() {
      replaceFormtoPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
      offersPresenter.init();
      destinationPresenter.init();
    }

    function replaceFormtoPoint() {
      replace(pointComponent, editPointComponent);
      offersPresenter.reset();
      destinationPresenter.reset();
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
