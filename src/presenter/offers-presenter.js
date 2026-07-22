import PointOffersView from '../view/point-offers-view.js';
import { render } from '../render.js';

export default class OffersPresenter {
  constructor({ point, offers }) {
    this.point = point;
    this.offers = offers;
  }

  init() {
    render(
      new PointOffersView({
        point: this.point.getPointData(),
        offers: this.offers,
      }),
      this.point.getElement().querySelector('.event__details'),
    );
  }
}
