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

module.exports = new Timer();
