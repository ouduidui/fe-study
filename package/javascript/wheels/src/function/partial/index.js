/**
 * 偏函数
 * @author 欧怼怼
 * @param fn {function(...[*]): *}
 * @param args {*}
 * @return {function(...[*]): *}
 */
function partial(fn, ...args) {
  return function (...newArgs) {
    return fn.call(this, ...args, ...newArgs);
  };
}

module.exports = partial;
