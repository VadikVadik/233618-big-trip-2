const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Switch to comfort',
        price: 120,
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 132,
      },
      {
        id: 3,
        title: 'Add meal',
        price: 1200,
      },
      {
        id: 4,
        title: 'Rent a car',
        price: 560,
      },
      {
        id: 5,
        title: 'Order Uber',
        price: 3120,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 6,
        title: 'Upgrade to premium seats',
        price: 345,
      },
      {
        id: 7,
        title: 'Add Wi-Fi access',
        price: 132,
      },
      {
        id: 8,
        title: 'Lunch in city',
        price: 1200,
      },
      {
        id: 9,
        title: 'Reserve window seat',
        price: 560,
      },
      {
        id: 10,
        title: 'Add extra legroom',
        price: 3120,
      },
      {
        id: 11,
        title: 'Priority boarding',
        price: 115,
      },
      {
        id: 12,
        title: 'Seat next to companion',
        price: 457,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 13,
        title: 'Early check-in',
        price: 100,
      },
      {
        id: 14,
        title: 'Late check-out',
        price: 330,
      },
      {
        id: 15,
        title: 'Room upgrade',
        price: 1800,
      },
      {
        id: 16,
        title: 'Airport shuttle',
        price: 590,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 17,
        title: 'GPS navigation',
        price: 1900,
      },
      {
        id: 18,
        title: 'Child safety seat',
        price: 30,
      },
      {
        id: 19,
        title: 'Additional driver',
        price: 100,
      },
      {
        id: 20,
        title: 'Roadside assistance',
        price: 50,
      },
      {
        id: 21,
        title: 'Dash cam rental',
        price: 880,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 22,
        title: 'Extra baggage',
        price: 1800,
      },
      {
        id: 23,
        title: 'Priority check-in',
        price: 390,
      },
      {
        id: 24,
        title: 'Lounge access',
        price: 1030,
      },
      {
        id: 25,
        title: 'Fast track security',
        price: 5080,
      },
      {
        id: 26,
        title: 'Extra legroom seat',
        price: 8880,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 27,
        title: 'Wine pairing menu',
        price: 1800,
      },
      {
        id: 28,
        title: 'Private dining room',
        price: 489,
      },
      {
        id: 29,
        title: 'Birthday dessert',
        price: 100,
      },
      {
        id: 30,
        title: 'Pre-order dishes',
        price: 580,
      },
      {
        id: 31,
        title: 'Live music table',
        price: 83,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 32,
        title: 'Cabin upgrade',
        price: 1200,
      },
      {
        id: 33,
        title: 'All-inclusive drinks',
        price: 600,
      },
      {
        id: 34,
        title: 'Spa package',
        price: 250,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'train',
    offers: [
      {
        id: 35,
        title: 'Sleeper cabin upgrade',
        price: 444,
      },
      {
        id: 36,
        title: 'Dining car reservation',
        price: 690,
      },
      {
        id: 37,
        title: 'Quiet zone seat',
        price: 2250,
      },
      {
        id: 38,
        title: 'Power outlet seat',
        price: 10,
      },
      {
        id: 39,
        title: 'Bicycle transport',
        price: 2560,
      },
    ],
  },
  {
    type: 'transport',
    offers: [
      {
        id: 40,
        title: 'Shared shuttle',
        price: 9990,
      },
      {
        id: 41,
        title: 'Private transfer',
        price: 337,
      },
      {
        id: 42,
        title: 'Wheelchair accessible',
        price: 220,
      },
      {
        id: 43,
        title: 'Group minibus',
        price: 1100,
      },
      {
        id: 44,
        title: 'Eco-friendly vehicle',
        price: 260,
      },
    ],
  },
];

const getOffersList = () => mockOffers;

export { getOffersList };
