const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));

export { getRandomArrayElement, updateItem };
