/**
 * 时间戳实现
 * @param func
 * @param delay
 * @return {(function(): void)|*}
 */
function throttle(func, delay) {
  let previous = 0; // 保存上次调用的时间戳
  return function () {
    const now = Date.now();
    if (now >= delay + previous) {
      func.apply(this, arguments);
      previous = now;
    } else {
      console.warn('距离上次调用的时间差不满足要求');
    }
  };
}

module.exports = throttle;
