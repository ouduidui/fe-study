/**
 * 防抖简易版
 * @param func {any}
 * @param delay {number} 延迟时间
 * @return {(function(): void)|*}
 */
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

module.exports = debounce;
