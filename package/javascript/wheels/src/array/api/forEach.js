/**
 * 实现数组原型方法 forEach
 * @author 欧怼怼
 * @param callback {(currentValue: *, index?: number, array?: *[]) => void}
 * @param thisArg {object | undefined}
 * @returns {void}
 */
const _forEach = function (callback, thisArg) {
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
    // 使用call调用函数
    callback.call(thisArg, arr[index], index, arr);
    index++;
  }
};

module.exports = _forEach;
