/**
 * 防抖复杂版
 * @author 欧怼怼
 * @param func<Function>
 * @param delay<Number>
 * @param options<{context: *, leading: boolean}>
 * @return <Function>
 * */
function debounce(
  func,
  delay,
  options = {
    leading: false, // 表示是否立即执行
    context: null // 配置上下文
  }
) {
  let timer = null; // 存储定时器

  const debounceFn = function (...args) {
    // 清除定时器
    timer && clearTimeout(timer);
    // 处理上下文
    const context = options.context || this;

    // 如果timer为空且开启立即执行
    if (timer === null && options.leading) {
      func.apply(context, args); // 立即执行
      // 延迟清空定时器
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
    // 默认情况
    else {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };

  // 实现取消方法
  debounceFn.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounceFn;
}

module.exports = debounce;
