import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import {
  sortPointsByDate,
  sortPointsByTime,
  sortPointsByPrice,
} from '../utils/point.js';

const noPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

export default class TripPresenter {
  #tripListComponent = new TripListView();
  #messageComponent = null;
  #sortComponent = null;
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DATE;
  #filterType = FilterType.EVERYTHING;

  constructor({
    tripContainer,
    pointsModel,
    offersModel,
    destinationsModel,
    filterModel,
    onNewPointDestroy,
  }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent,
      offersList: this.offers,
      destinationsList: this.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredPoints.sort(sortPointsByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DATE;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    const points = this.points;

    if (!points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();

    for (const point of points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent,
      offersList: this.offers,
      destinationsList: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    const noPointsTextValue = noPointsTextType[this.#filterType];
    this.#messageComponent = new MessageView({
      message: noPointsTextValue,
    });

    render(this.#messageComponent, this.#tripContainer);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
