import { getDestinationsList } from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = getDestinationsList();

  get destinations() {
    return this.#destinations;
  }
}
