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

    render(new SortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    this.renderEditPointForm(this.#tripPoints[0]);

    for (let i = 1; i < this.#tripPoints.length; i++) {
      render(
        new PointView({ point: this.#tripPoints[i] }),
        this.#tripListComponent.element,
      );
    }
  }

  renderEditPointForm(point = {}) {
    const pointView = new EditPointView({
      point: point,
      destinations: this.#destinationsList,
    });

    const offersPresenter = new OffersPresenter({
      point: pointView,
      offers: this.#offersList,
    });

    const destinationPresenter = new DestinationPresenter({ point: pointView });

    render(pointView, this.#tripListComponent.element);
    offersPresenter.init();
    destinationPresenter.init();
  }
}
