/**
 * 复杂版本
 * @param func<Function>
 * @param delay<Number>
 * @param options<Object>
 * @return <Function>
 * */
function throttle(
  func,
  delay,
  options = {
    leading: true, // 表示是否立即执行
    trailing: false, // 是否在最后额外触发一次
    context: null
  }
) {
  let timer;
  let previous = 0;
  const _throttle = function (...arg) {
    options.leading = options.leading !== undefined ? options.leading : true; // 表示是否立即执行
    options.trailing = options.trailing !== undefined ? options.trailing : false; // 是否在最后额外触发一次
    options.context || (options.context = this); // 判断是否需要绑定新的上下文
    let now = Date.now();
    if (!previous && !options.leading) {
      previous = now;
    }
    if (now >= previous + delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(options.context, arg);
      previous = now;
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        func.apply(options.context, arg);
        previous = 0;
        timer = null;
      }, delay);
    }
  };

  _throttle.cancel = function () {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };

  return _throttle;
}

module.exports = throttle;
