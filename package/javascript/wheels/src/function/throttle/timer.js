/**
 * 定时器实现
 * @param func
 * @param delay
 * @return {(function(): void)|*}
 */
function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      console.warn('距离上次调用的时间差不满足要求');
    }
  };
}

module.exports = throttle;
