/**
 * 简单版时间切片
 * @author 欧怼怼
 * @param generator {*}
 * @return {(function(): void)|*}
 */
function timeSlicing(generator) {
  if (typeof generator === 'function') generator = generator();

  if (!generator || typeof generator.next !== 'function') return;

  return function next() {
    let res = generator.next();
    if (res.done) return;
    // next会在下一个宏任务执行
    setTimeout(next);
  };
}

module.exports = timeSlicing;
