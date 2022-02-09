# 函数节流

## 思路

函数节流跟函数防抖一样，都是用于优化高频率调用函数。

而节流刚好跟防抖相反，函数节流是在执行后一段时间内，无法重复执行。

## 实现

### 使用定时器实现

我们可以模仿函数防抖，使用定时器来实现。

```javascript
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
```

### 使用时间戳实现

```javascript
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
```

### 复杂版本实现

同样我们也可以实现一个比较全面的版本。比如配置选项，可以传入函数调用时的上下文，可以配置是否立即执行，可以配置是否在最后额外再触发一次函数。

同样我们可以再设置一个取消函数，来取消上一次节流操作。

```javascript
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
```