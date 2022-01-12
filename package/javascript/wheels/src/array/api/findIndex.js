/**
 * Array.prototype._findIndex
 * @returns <number>: 数组中通过提供测试函数的第一个元素的索引。否则，返回-1
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
const _findIndex = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return k; // 返回第一个满足测试的元素索引
      }
    }
    k++;
  }

  // 如果都不通过，则返回-1
  return -1;
};

module.exports = _findIndex;
