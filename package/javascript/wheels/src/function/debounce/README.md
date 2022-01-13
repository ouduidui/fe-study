# 防抖 Debounce

## 用途

当多次被调用时，只执行最后一次。

## 实现

### 简易版本

```javascript
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
```

### 复杂版本

- 支持`options`选项：
  - `context`：上下文
  - `leading`： 是否理解执行
- 支持中断：
  - `debounce.cancel()`

```javascript
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
```
