/**
 * 节流复杂版本
 * @author 欧怼怼
 * @param func {(function(): void)}
 * @param delay {Number}
 * @param options {{leading?: boolean, trailing?: boolean, context?: *}}
 * @return {(function(): void)}
 * */
function throttle(
  func,
  delay,
  options = {
    leading: true, // 表示是否立即执行
    trailing: false, // 是否在最后额外触发一次
    context: null // func运行的this指向
  }
) {
  let prevTimestamp = 0; // 存储上一次执行的时间戳
  let timer = null; // 存储定时器
  const throttleFn = function (...args) {
    // 初始化选项参数
    const leading = options.leading !== undefined ? options.leading : true;
    const trailing = !!options.trailing;
    const context = options.context || this;

    let now = Date.now();

    // 如果第一次调用且设置不立即执行的话，将 prevTimestamp 设置为当前时间戳
    // 此时第一次调用的时候 now >= prevTimestamp + delay 就不会通过了
    if (!prevTimestamp && !leading) {
      prevTimestamp = now;
    }

    // 正常节流调用，跟时间戳实现一致
    if (now >= prevTimestamp + delay) {
      // 如果触发时发现定时器存在也还没执行，则及时取消，以避免重复执行，失去了节流的意义
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      // 调用函数
      func.apply(context, args);
      prevTimestamp = now;
    }

    // 如果设置了在最后额外触发一次，则定义一个定时器去执行
    if (!timer && trailing) {
      timer = setTimeout(() => {
        // 调用函数
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };

  // 取消函数，重置参数
  throttleFn.cancel = function () {
    prevTimestamp = 0;
    clearTimeout(timer);
    timer = null;
  };

  return throttleFn;
}

module.exports = throttle;
