/**
 * 防抖简易版
 * @param func {any}
 * @param delay {number} 延迟时间
 * @return {(function(): void)|*}
 */
function debounce1(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

/**
 * 防抖复杂版
 * @param func<Function>
 * @param delay<Number>
 * @param options<{context: any, leading: boolean}>
 * @return <Function>
 * */
function debounce2(
  func,
  delay,
  options = {
    leading: false, // 表示是否立即执行
    context: null
  }
) {
  let timer;
  let isRun = false;
  const _debounce = function (...args) {
    options.context || (options.context = this);
    if (timer) {
      clearTimeout(timer);
    }

    if (options.leading && !timer) {
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      func.apply(options.context, args);
      isRun = true;
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, delay);
    }
  };

  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return _debounce;
}

module.exports = {
  debounce1,
  debounce2
};
