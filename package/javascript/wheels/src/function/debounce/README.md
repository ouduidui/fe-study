# 函数防抖

## 思路

函数防抖的作用就是在事件触发的一段时间后，才会执行函数；如果这段时间内又触发函数，则重新开始计时。

## 实现

### 简单版本实现

我们可以使用`setTimeout`定时器来实现延迟执行，并设置一个`timer`变量存储定时器，下次调用时可以清除上一次的调用。

```javascript
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
```

### 复杂版本实现

我们可以基于简单版本再添加一些功能。比如我们可以实现一个`options`选项参数，可以实现配置上下文，并且实现配置是否立即执行。

其次，我们可以实现一个静态函数`cancel`，可以实现取消执行。

接下来我们来实现一下：

```javascript
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
      func.apply(context, args);  // 立即执行
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
```