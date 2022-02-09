/**
 * 节流定时器实现
 * @author 欧怼怼
 * @param func {(function(): void)}
 * @param delay {number}
 * @return {(function(): void)}
 */
function throttle(func, delay) {
  let timer = null; // 存储定时器
  return function (...args) {
    // 通过timer判断是否可执行
    if (timer === null) {
      // 立即执行函数
      func.apply(this, args);
      // 开启定时器
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      console.warn('距离上次调用的时间差不满足要求');
    }
  };
}

module.exports = throttle;
