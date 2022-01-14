/**
 * 实现数组原型方法 some
 * @author OUDUIDUI
 * @param callback {(accumulator: *, currentValue: *, index?: number, array?: *[]) => *}
 * @param initialValue {*}
 * @returns {*}
 */
const _reduce = function (callback, initialValue) {
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

  // 在没有初始值的空数组上调用callback将报错
  if (len === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let index = 0;
  let accumulator = initialValue;
  // 没传入初始值的时候，取数组第一个值为初始值
  if (initialValue === undefined) {
    index = 1;
    accumulator = arr[0];
  }

  // 遍历调用
  while (index < len) {
    // 更新accumulator
    accumulator = callback(accumulator, arr[index], index, arr);
    index++;
  }

  // 返回累计处理的结果
  return accumulator;
};

module.exports = _reduce;
