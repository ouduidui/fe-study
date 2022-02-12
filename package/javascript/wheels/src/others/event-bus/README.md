# 事件总线（发布-订阅模式）

## 思路

如果你使用过Vue，那估计对事件总线不陌生。在Vue中的事件绑定`$on`、事件派发`$emit`、事件取消监听`$off`等都属于事件总线的功能。

它实际上就是一种发布-订阅模式，包括Vue中的响应式更新实现，也是相同原理。

事件总线是一种集中式事件处理机制，允许不同的组件之间进行彼此通信而又不需要相互依赖，从而达到一种解耦的目的。

## 实现

```javascript
/**
 * 事件总线 （发布-订阅模式）
 * @author 欧怼怼
 */
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