/**
 * Array.prototype._map
 * @returns <array>: 一个由原数组每个元素执行回调函数的结果组成的新数组
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
const _map = function (callback, thisArg) {
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
  const res = [];
  while (k < len) {
    if (k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);  // 赋值各元素的结果
    }
    k++;
  }

  // 将结果数组返回
  return res;
}

module.exports = _map;
