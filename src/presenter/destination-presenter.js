import PointDestinationView from '../view/point-destination-view.js';
import { render } from '../render.js';

export default class DestinationPresenter {
  constructor({ point }) {
    this.point = point;
  }

  init() {
    render(
      new PointDestinationView({
        point: this.point.getPointData(),
      }),
      this.point.getElement().querySelector('.event__details'),
    );
  }
}
