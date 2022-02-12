/**
 * 增强版时间切片
 * @author 欧怼怼
 * @param generator {*}
 * @return {(function(): void)|*}
 */
function timeSlicing(generator) {
  if (typeof generator === 'function') generator = generator();

  if (!generator || typeof generator.next !== 'function') return;

  return function next() {
    // 获取开始执行的毫秒级时间戳
    const start = performance.now();
    let res = null;
    // 16ms内持续迭代执行
    do {
      res = generator.next();
    } while (!res.done && performance.now() - start < 16);

    if (res.done) return;
    // next会在下一个宏任务执行
    setTimeout(next);
  };
}

module.exports = timeSlicing;
