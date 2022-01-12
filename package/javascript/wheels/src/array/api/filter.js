/**
 * Array.prototype._filter
 * @returns <array>: 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
const _filter = function (callback, thisArg) {
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
      if (callback.call(thisArg, O[k], k, O)) {
        res.push(O[k]); // 如果该元素通过测试，即添加到结果数组中
      }
    }
    k++;
  }

  // 将结果数组返回
  return res;
};

module.exports = _filter;
