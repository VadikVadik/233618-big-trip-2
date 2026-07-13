import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor({ tripContainer }) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EditPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.tripListComponent.getElement());
    }
  }
}
