import { getDestinationsList } from '../mock/destination.js';

export default class DestinationsModel {
  destinations = getDestinationsList();

  getDestinations() {
    return this.destinations;
  }
}
