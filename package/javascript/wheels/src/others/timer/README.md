# 使用setTimeout实现setInterval

## 思路

如果在实际应用中会经常使用到计时器，而使用`setInterval`的话会存在一些缺陷。`setInterval`实际上是把事件直接放到任务队列中，而真正执行的时间并不确定，有可能存在上一个计时器任务还没执行结束，下个计时器任务就开始执行了。

因此我们可以通过`setTimeout`来模拟实现`setInterval`。

## 实现

### 简单版实现

```javascript
(function timer() {
  let t = setTimeout(() => {
    console.log('do something');
    clearTimeout(t);
    timer();
  }, 1000);
})();
```

### 复杂版实现

我们可以封装成一个工具类，支持添加多个计时任务，同时也支持删除任务。

```javascript
/**
 * 使用setTimeout实现定时器
 * @author 欧怼怼
 */
class Timer {
  constructor() {
    // 存储定时任务
    this.timerList = new Map();
  }

  /**
   * 增加定时任务
   * @param name {string}
   * @param callback {() => void}
   * @param [interval] {number}
   */
  addTimer(name, callback, interval = 1000) {
    // 将定时任务存储起来
    this.timerList.set(name, {
      callback,
      interval,
      timer: null // 存储定时器，便于清除
    });
    // 开启定时器
    this.runTimer(name);
  }

  /**
   * 开启定时任务
   * @param name {string}
   */
  runTimer(name) {
    const self = this;

    // 自调用
    (function run() {
      // 判断是否有该定时任务
      if (self.timerList.has(name)) {
        const task = self.timerList.get(name);
        // 设置定时器
        task.timer = setTimeout(() => {
          task.callback();
          // 清除上一个定时器
          clearTimeout(task.timer);
          // 再次调用定时器
          run();
        }, task.interval);
      }
    })();
  }

  /**
   * 删除定时任务
   * @param name {string}
   */
  clearTimer(name) {
    if (this.timerList.has(name)) {
      const task = this.timerList.get(name);
      // 删除前先清除定时器
      clearTimeout(task.timer);
      this.timerList.delete(name);
    }
  }
}
```

然后我们可以这样使用：

```javascript
const timer = new Timer();
let i = 0;
// 添加定时任务
timer.addTimer(
  'test',
  () => {
    i++;

    // 当i等于5时，删除定时器
    if (i === 5) {
      timer.clearTimer('test');
    }
  },
  5000 // 时间间隔五秒
);
```