/**
 * 实现数组原型方法 some
 * @author 欧怼怼
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {boolean}
 */
const _some = function (callback, thisArg) {
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
  while (index < len) {
    if (callback.call(thisArg, arr[index], index, arr)) {
      // 只要有一个元素通过测试，即返回true
      return true;
    }
    index++;
  }

  // 遍历结束还没有通过测试，即返回false
  return false;
};

module.exports = _some;
