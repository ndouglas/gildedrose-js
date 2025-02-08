exports.makeFactory = () => {
  const result = {};
  result.get = (itemName) => result[itemName] || result.default;
  return result;
};
