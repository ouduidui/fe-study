# 防抖节流

## 防抖 Debounce

### 用途

当多次被调用时，只执行最后一次。

### 实现

- 简易版本

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
    }, delay)
  }
}
```

- 复杂版本
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
function debounce(func, delay, options = {
  leading: false,  // 表示是否立即执行
  context: null
}) {
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
      }, delay)
     func.apply(options.context, args);
      isRun = true;
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, delay)
    }
  };

  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }

  return _debounce;
}
```

## 节流 Throttle

### 用途

在执行后一段之间内，无法重复执行。

### 实现

- 使用时间戳实现

```javascript
/**
 * 时间戳实现
 * @param func
 * @param delay
 * @return {(function(): void)|*}
 */
function throttle(func, delay) {
  let previous = 0;  // 保存上次调用的时间戳
  return function () {
    const now = Date.now();
    if (now >= delay + previous) {
      func.apply(this, arguments);
      previous = now;
    } else {
      console.warn('距离上次调用的时间差不满足要求')
    }
  }
}
```

- 使用定时器实现

```javascript
/**
 * 定时器实现
 * @param func
 * @param delay
 * @return {(function(): void)|*}
 */
function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay)
    } else {
      console.warn('距离上次调用的时间差不满足要求')
    }
  }
}
```

- 复杂版本
  - 支持`options`参数
    - `leading`：是否立即执行
    - `trailing`：是否在最后额外触发一次
    - `context`：上下文
  - 支持中断最后额外触发
    - `debounce.cancel()`

```javascript
/**
 * 复杂版本
 * @param func<Function>
 * @param delay<Number>
 * @param options<Object>
 * @return <Function>
 * */
function throttle3(func, delay, options = {
  leading: true,   // 表示是否立即执行
  trailing: false,  // 是否在最后额外触发一次
  context: null
}) {
  let timer;
  let previous = 0;
  const _throttle = function (...arg) {
    options.leading = options.leading !== undefined ? options.leading : true;  // 表示是否立即执行
    options.trailing = options.trailing !== undefined ? options.trailing : false; // 是否在最后额外触发一次
    options.context || (options.context = this);  // 判断是否需要绑定新的上下文
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
      setTimeout(() => {
        func.apply(options.context, arg);
        previous = 0;
        timer = null;
      }, delay)
    }
  }

  _throttle.cancel = function () {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  }

  return _throttle;
}
```

