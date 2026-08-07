import { getRandomArrayElement } from '../utils/common.js';
import { getDestinationsList } from './destination.js';
import { getOffersList } from './offer.js';

const mockPoints = [
  {
    startDateTime: '2026-05-01T09:00:00.000Z',
    endDateTime: '2026-05-01T12:30:00.000Z',
    type: 'bus',
    destinationId: 1,
    price: 250,
    offersIds: [6, 8, 10],
    isFavorite: true,
  },
  {
    startDateTime: '2026-01-02T12:30:00.000Z',
    endDateTime: '2026-01-02T21:05:00.000Z',
    type: 'check-in',
    destinationId: 2,
    price: 1490,
    offersIds: [15],
    isFavorite: false,
  },
  {
    startDateTime: '2026-11-04T11:45:00.000Z',
    endDateTime: '2026-11-05T09:05:00.000Z',
    type: 'drive',
    destinationId: 3,
    price: 890,
    offersIds: [19, 20],
    isFavorite: false,
  },
  {
    startDateTime: '2026-01-05T06:15:00.000Z',
    endDateTime: '2026-01-05T18:45:00.000Z',
    type: 'flight',
    destinationId: 1,
    price: 1250,
    offersIds: [23, 24, 26],
    isFavorite: true,
  },
  {
    startDateTime: '2026-07-12T11:00:00.000Z',
    endDateTime: '2026-07-12T11:15:00.000Z',
    type: 'restaurant',
    destinationId: 2,
    price: 90,
    offersIds: [28, 30],
    isFavorite: true,
  },
  {
    startDateTime: '2026-01-06T19:56:00.000Z',
    endDateTime: '2026-01-19T23:55:00.000Z',
    type: 'ship',
    destinationId: 3,
    price: 2215,
    offersIds: [],
    isFavorite: false,
  },
  {
    startDateTime: '2026-01-06T19:56:00.000Z',
    endDateTime: '2026-01-19T23:55:00.000Z',
    type: 'sightseeing',
    destinationId: 3,
    price: 2215,
    offersIds: [],
    isFavorite: false,
  },
  {
    startDateTime: '2026-01-06T19:56:00.000Z',
    endDateTime: '2026-01-19T23:55:00.000Z',
    type: 'taxi',
    destinationId: 3,
    price: 2215,
    offersIds: [1, 3, 5],
    isFavorite: false,
  },
  {
    startDateTime: '2026-01-06T19:56:00.000Z',
    endDateTime: '2026-01-19T23:55:00.000Z',
    type: 'train',
    destinationId: 3,
    price: 2215,
    offersIds: [35, 37, 39],
    isFavorite: false,
  },
  {
    startDateTime: '2026-01-06T19:56:00.000Z',
    endDateTime: '2026-01-19T23:55:00.000Z',
    type: 'transport',
    destinationId: 3,
    price: 2215,
    offersIds: [44],
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

const getPoints = (pointsCount) => {
  const points = [getRandomArrayElement(mockPoints)];

  while (points.length < pointsCount) {
    const newPoint = getRandomArrayElement(mockPoints);

    if (!points.includes(newPoint)) {
      points.push(newPoint);
    }
  }

  points.map((point) => {
    point.destination = getDestinationById(point.destinationId);
    point.offers = point.offersIds.map((id) => getOfferById(id));
    point.id = crypto.randomUUID();
  });

  return points;
};

export { getPoints };
