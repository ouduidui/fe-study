class EventBus {
  constructor() {
    this.cache = {}
  }

  on(name, fn) {
    if (!this.cache[name]) {
      this.cache[name] = [];
    }

    this.cache[name].push(fn)
  }

  once(name, fn) {
    const self = this;
    const newFn = function (...args) {
      fn.call(this, ...args);
      self.off(name, newFn);
    }
    self.on(name, newFn);
  }

  off(name, fn) {
    if (this.cache[name]) {
      this.cache[name] = this.cache[name].filter(f => f !== fn && f.callback !== fn)
    }
  }

  emit(name, ...args) {
    if (this.cache[name]) {
      let tasks = [...this.cache[name]];
      for (let fn of tasks) {
        fn(...args)
      }
    }
  }
}

module.exports = EventBus;
