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

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offer'];

const FiterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { EVENT_TYPES, DEFAULT_TYPE, SORT_TYPES, FiterType };
