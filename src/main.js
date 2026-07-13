import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './render.js';

const filterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ tripContainer: tripEventsElement });

render(new FilterView(), filterElement);
tripPresenter.init();
