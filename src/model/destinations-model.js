import Observable from '../framework/observable.js';
import { getDestinationsList } from '../mock/destination.js';

export default class DestinationsModel extends Observable {
  #destinations = getDestinationsList();

  get destinations() {
    return this.#destinations;
  }
}
