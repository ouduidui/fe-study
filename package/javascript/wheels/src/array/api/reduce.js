/**
 * Array.prototype._reduce
 * @returns <any>: 函数累计处理的结果
 * @param callback<function>: executor有四个参数：accumulator、currentValue、index和array
 * @param initialValue<any>: 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错
 * @param thisArg<object>
 */
const _reduce = function (callback, initialValue, thisArg) {
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
  let acc;

  if (arguments.length > 1) {
    acc = initialValue;
  } else {
    // 没传入初始值的时候，取数组第一个非empty的值为初始值
    while (k < len && !(k in O)) {
      k++;
    }
    if (k > len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    acc = O[k++]; // 后续遍历从k+1开始遍历
  }

  while (k < len) {
    if (k in O) {
      acc = callback.call(thisArg, acc, O[k], k, O);
    }
    k++;
  }

  return acc;
};

module.exports = _reduce;
