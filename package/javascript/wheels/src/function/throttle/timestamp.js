/**
 * 节流时间戳实现
 * @author 欧怼怼
 * @param func {(function(): void)}
 * @param delay {number}
 * @return {(function(): void)}
 */
function throttle(func, delay) {
  // 保存上一次的时间戳
  let prevTimestamp = 0;
  return function (...args) {
    // 获取现在的时间戳
    const now = Date.now();
    // 比较 now 和 prevTimestamp + delay
    if (now >= prevTimestamp + delay) {
      // 执行函数
      func.apply(this, args);
      // 更新时间戳
      prevTimestamp = now;
    } else {
      console.warn('距离上次调用的时间差不满足要求');
    }
  };
}

module.exports = throttle;
