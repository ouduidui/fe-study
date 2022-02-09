/**
 * 防抖简易版
 * @author 欧怼怼
 * @param func {(function(): void)}
 * @param delay {number} 延迟时间
 * @return {(function(): void)|*}
 */
function debounce(func, delay) {
  let timer; // 存储定时器
  return function (...args) {
    clearTimeout(timer); // 每次调用时，清除之前的定时器
    // 重新新建一个定时器
    timer = setTimeout(() => {
      // 调用函数
      func.apply(this, args);
    }, delay);
  };
}

module.exports = debounce;
