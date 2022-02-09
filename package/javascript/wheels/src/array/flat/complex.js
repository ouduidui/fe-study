/**
 * 完整版数组扁平化
 * @author 欧怼怼
 * @param array {*[]}
 * @param depth {number}
 * @returns {*[]}
 */
const flat = function (array, depth = 1) {
  if (depth === -1) {
    return array.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? flat(cur, -1) : cur);
    }, []);
  } else {
    return depth > 0
      ? array.reduce((acc, cur) => {
          return acc.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
        }, [])
      : array;
  }
};

module.exports = flat;
