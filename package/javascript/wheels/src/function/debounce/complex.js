/**
 * 防抖复杂版
 * @param func<Function>
 * @param delay<Number>
 * @param options<{context: any, leading: boolean}>
 * @return <Function>
 * */
function debounce(
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

module.exports = debounce;
