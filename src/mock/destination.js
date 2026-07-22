const mockDestinations = [
  {
    id: 1,
    title: 'Amsterdam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Cras aliquet varius magna, non porta ligula feugiat eget. \
      Fusce tristique felis at fermentum pharetra.',
    photos: [
      'https://loremflickr.com/248/152?random=34',
      'https://loremflickr.com/248/152?random=23',
      'https://loremflickr.com/248/152?random=12',
      'https://loremflickr.com/248/152?random=99',
    ],
  },
  {
    id: 2,
    title: 'Chamonix',
    description:
      'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. \
      Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    photos: [
      'https://loremflickr.com/248/152?random=1',
      'https://loremflickr.com/248/152?random=2',
      'https://loremflickr.com/248/152?random=15',
      'https://loremflickr.com/248/152?random=69',
    ],
  },
  {
    id: 3,
    title: 'Geneva',
    description:
      'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photos: [
      'https://loremflickr.com/248/152?random=77',
      'https://loremflickr.com/248/152?random=89',
      'https://loremflickr.com/248/152?random=26',
      'https://loremflickr.com/248/152?random=93',
    ],
  },
];

const getDestinationsList = () => mockDestinations;

export { getDestinationsList };
