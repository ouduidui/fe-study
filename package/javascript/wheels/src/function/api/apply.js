/**
 * 实现函数原生方法 apply
 * @author 欧怼怼
 * @param thisArg {object} this上下文
 * @param argsArray {*[]} 参数
 * @return {*}
 */
function _apply(thisArg, argsArray) {
  if (!thisArg) {
    thisArg = window !== undefined ? window : global;
  }

  // 处理参数
  if (!argsArray) {
    argsArray = [];
  }

  thisArg = Object(thisArg);

  const fnKey = Symbol();
  thisArg[fnKey] = this;

  const result = thisArg[fnKey](...argsArray);
  delete thisArg[fnKey];

  return result;
}

module.exports = _apply;
