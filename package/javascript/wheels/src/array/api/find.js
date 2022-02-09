/**
 * 实现数组原型方法 find
 * @author 欧怼怼
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {*}
 */
const _find = function (callback, thisArg) {
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
    // 当有一个满足测试函数就立即返回
    if (callback.call(thisArg, arr[index], index, arr)) {
      return arr[index];
    }
    index++;
  }

  // 如果没有一个满足条件的话则返回 undefined
  return undefined;
};

module.exports = _find;
