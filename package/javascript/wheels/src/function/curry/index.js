/**
 *
 * @param fn {Function}
 * @param args {any}
 * @returns {(function(...[*]): void)|*}
 */
function curry(fn, ...args) {
  // 获取原函数的参数长度
  let length = fn.length;

  return function (...newArgs) {
    // 合并参数
    const combined = [...args, ...newArgs];

    // 判断参数总和是否达到要求
    if (combined.length < length) {
      // 如果还是缺少参数，则返回函数继续调用
      return curry(fn.bind(this), ...combined);
    } else {
      // 如果参数不缺少，就调用函数
      return fn.apply(this, combined);
    }
  };
}

module.exports = curry;
