import { getRandomArrayElement } from '../utils.js';
import { getDestinationsList } from './destination.js';
import { getOffersList } from './offer.js';

const mockPoints = [
  {
    startDateTime: new Date('2026-05-01:09:00'),
    endDateTime: new Date('2026-05-01:12:30'),
    type: 'bus',
    destination: 1,
    price: 250,
    offers: [6, 8, 10],
    isFavorite: true,
  },
  {
    startDateTime: new Date('2026-01-02:12:30'),
    endDateTime: new Date('2026-01-02:21:05'),
    type: 'check-in',
    destination: 2,
    price: 1490,
    offers: [15],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-11-04:11:45'),
    endDateTime: new Date('2026-11-05:09:05'),
    type: 'drive',
    destination: 3,
    price: 890,
    offers: [19, 20],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-01-05:06:15'),
    endDateTime: new Date('2026-01-05:18:45'),
    type: 'flight',
    destination: 1,
    price: 1250,
    offers: [23, 24, 26],
    isFavorite: true,
  },
  {
    startDateTime: new Date('2026-07-12:11:00'),
    endDateTime: new Date('2026-07-12:11:15'),
    type: 'restaurant',
    destination: 2,
    price: 90,
    offers: [28, 30],
    isFavorite: true,
  },
  {
    startDateTime: new Date('2026-01-06:19:56'),
    endDateTime: new Date('2026-01-19:23:55'),
    type: 'ship',
    destination: 3,
    price: 2215,
    offers: [],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-01-06:19:56'),
    endDateTime: new Date('2026-01-19:23:55'),
    type: 'sightseeing',
    destination: 3,
    price: 2215,
    offers: [],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-01-06:19:56'),
    endDateTime: new Date('2026-01-19:23:55'),
    type: 'taxi',
    destination: 3,
    price: 2215,
    offers: [1, 3, 5],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-01-06:19:56'),
    endDateTime: new Date('2026-01-19:23:55'),
    type: 'train',
    destination: 3,
    price: 2215,
    offers: [35, 37, 39],
    isFavorite: false,
  },
  {
    startDateTime: new Date('2026-01-06:19:56'),
    endDateTime: new Date('2026-01-19:23:55'),
    type: 'transport',
    destination: 3,
    price: 2215,
    offers: [44],
    isFavorite: false,
  },
];

const getDestinationById = (id) =>
  getDestinationsList().find((item) => item.id === id);

const getOfferById = (id) => {
  for (const category of getOffersList()) {
    const targetOffer = category.offers.find((offer) => offer.id === id);

    if (targetOffer) {
      return targetOffer;
    }
  }
};

class MockPoint {
  constructor({
    startDateTime,
    endDateTime,
    type,
    destination,
    price,
    offers,
    isFavorite,
  }) {
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.type = type;
    this.price = price;
    this.isFavorite = isFavorite;
    this.destination = getDestinationById(destination);
    this.offers = offers.map((id) => getOfferById(id));
  }
}

const getRandomPoint = () => new MockPoint(getRandomArrayElement(mockPoints));

export { getRandomPoint };
