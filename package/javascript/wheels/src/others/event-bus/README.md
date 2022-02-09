# 事件总线

事件总线是典型的发布订阅模式。如果使用过`vue`对它也不模式，比如`$on`、`$emit`等。

事件总线核心功能无非就是订阅事件`on`，派发事件`emit`，取消订阅事件`off`。然后再外加一个功能`once`，即订阅后触发一次后就删除。

## 实现

```javascript
class EventBus {
  constructor() {
    // 存储事件
    this.cache = {};
  }

  /**
   * 订阅事件
   * @param name {string} 事件名称
   * @param fn {function} 任务函数
   */
  on(name, fn) {
    // 初始化事件数组
    if (!this.cache[name]) {
      this.cache[name] = [];
    }

    // 更新事件
    this.cache[name].push(fn);
  }

  /**
   * 删除事件
   * @param name {string} 事件名称
   * @param fn {function} 任务函数
   */
  off(name, fn) {
    if (this.cache[name]) {
      // 过滤掉取消绑定的任务
      this.cache[name] = this.cache[name].filter((f) => f !== fn && f.callback !== fn);
    }
  }

  /**
   * 派发事件
   * @param name {string} 事件名称
   * @param args {*[]} 参数
   */
  emit(name, ...args) {
    if (this.cache[name]) {
      let tasks = [...this.cache[name]];
      // 遍历调用
      for (let fn of tasks) {
        fn(...args);
      }
    }
  }

  /**
   * 只派发一次后删除
   * @param name
   * @param fn
   */
  once(name, fn) {
    const self = this;
    // 新建一个函数，执行完fn后触发off
    const newFn = function (...args) {
      fn.call(this, ...args);
      self.off(name, newFn);
    };
    // 绑定
    self.on(name, newFn);
  }
}
```