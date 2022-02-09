/**
 * 使用reduce实现简易版扁平化
 * @author 欧怼怼
 * @param array {*[]}
 * @returns {*[]}
 */
const flat = function (array) {
  return array.reduce((acc, cur) => {
    return acc.concat(
      Array.isArray(cur)
        ? flat(cur) //  如果是数组的话，在递归调用flat
        : cur
    );
  }, []);
};

module.exports = flat;
