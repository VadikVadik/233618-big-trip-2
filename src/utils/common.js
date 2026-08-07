const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const updateItem = (items, update) => {
  items.get(update.id).point = update;
  return items;
};

export { getRandomArrayElement, updateItem };
