/**
 * 实现promisify
 * @author 欧怼怼
 * @param original {function(...[*]=): *}
 * @return {function(...[*]=): Promise<unknown>}
 */
function promisify(original) {
  // 返回一个函数
  return function (...args) {
    // 函数返回一个promise
    return new Promise((resolve, reject) => {
      // 调用函数
      original.call(
        this,
        ...args,
        // 添加回调函数
        (err, data) => {
          err ? reject(err) : resolve(data);
        }
      );
    });
  };
}

module.exports = promisify;
