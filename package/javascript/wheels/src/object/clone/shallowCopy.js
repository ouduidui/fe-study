function shallowCopy(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  let newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    obj.hasOwnProperty(key) && (newObj[key] = obj[key]);
  }

  return newObj;
}

module.exports = shallowCopy;
