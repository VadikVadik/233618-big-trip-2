const EVENT_TYPES = [
  'bus',
  'check-in',
  'drive',
  'flight',
  'restaurant',
  'ship',
  'sightseeing',
  'taxi',
  'train',
];

const DEFAULT_TYPE = 'flight';

const DEFAULT_POINT = {
  startDateTime: '2026-01-01T00:00:00.000Z',
  endDateTime: '2026-01-01T00:00:00.000Z',
  type: 'flight',
  destinationId: 1,
  destination: {
    id: 1,
    title: 'Amsterdam',
    description:
      'Amsterdam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Cras aliquet varius magna, non porta ligula feugiat eget. \
      Fusce tristique felis at fermentum pharetra.',
    photos: [
      'https://loremflickr.com/248/152?random=34',
      'https://loremflickr.com/248/152?random=23',
      'https://loremflickr.com/248/152?random=12',
      'https://loremflickr.com/248/152?random=99',
    ],
  },
  price: 0,
  offersIds: [],
  offers: [],
  isFavorite: false,
};

const SortType = {
  DATE: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  EVENT_TYPES,
  DEFAULT_TYPE,
  DEFAULT_POINT,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
};
