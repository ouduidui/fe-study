/**
 * Array.prototype._some
 * @returns <boolean>: 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
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

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return true; // 只要有一个元素通过测试，即返回true
      }
    }
    k++;
  }

  // 遍历结束还没有通过测试，即返回false
  return false;
};

module.exports = _some;
