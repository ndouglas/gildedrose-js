exports.makeFactory = () => {
  const result = {};
  result.get = (itemName) => result[itemName] || result.default;
  result.update = (item) => result.get(item.name).update(item);
  return result;
};
