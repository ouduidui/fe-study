/**
 * 实现函数原生方法 call
 * @param thisArg {*} this上下文
 * @param args {*[]} 参数
 * @return {*}
 */
function _call(thisArg, ...args) {
  // 如果没有传thisArg默认为全局
  if (!thisArg) {
    thisArg = window !== undefined ? window : global;
  }

  // 有可能thisArg传的不是对象
  thisArg = Object(thisArg);

  // 使用Symbol确保唯一值
  const fnKey = Symbol();
  // 将函数绑定到thisArg上
  thisArg[fnKey] = this;

  // 调用函数
  const result = thisArg[fnKey](...args);
  // 删除函数
  delete thisArg[fnKey];

  return result;
}

module.exports = _call;
