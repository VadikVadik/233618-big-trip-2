import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render } from './render.js';

const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointsModel,
  offersModel,
  destinationsModel,
});

render(new FilterView(), filterElement);
tripPresenter.init();
