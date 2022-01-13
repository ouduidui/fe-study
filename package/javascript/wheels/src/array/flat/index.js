function flat(arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur) : cur), []);
}

module.exports = flat;
