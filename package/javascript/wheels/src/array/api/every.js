/**
 * 实现数组原型方法 every
 * @author 欧怼怼
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {boolean}
 */
const _every = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const len = arr.length;

  let index = 0;
  // 遍历数组
  while (index < len) {
    // 但凡有一个没有通过测试，则返回false
    if (!callback.call(thisArg, arr[index], index, arr)) {
      return false;
    }
  }

  // 遍历结束都通过测试，即返回true
  return true;
};

module.exports = _every;
