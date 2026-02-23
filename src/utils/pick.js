const pick = (object, keys) => {
  if (!Array.isArray(keys)) {
    throw new TypeError("keys must be an array");
  }

  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
module.exports = pick;
