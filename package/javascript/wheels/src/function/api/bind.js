/**
 * 实现函数原生方法 bind
 * @author 欧怼怼
 * @param thisArg {object} this上下文
 * @param args {*[]} 参数
 * @return {(function(...[*]=): (*))}
 * @private
 */
function _bind(thisArg, ...args) {
  const fn = this; // 获取函数
  // 封装新的函数
  const boundFunc = function (...args1) {
    // 合并参数
    const mergeArgs = args.concat(args1);
    // 判断是否使用new关键字创建实现
    if (new.target) {
      const result = fn.apply(this, mergeArgs);
      // 如果返回值为对象或方法，则直接返回
      if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result;
      }
      // 否则返回this
      return this;
    }

    // 如果不是new关键字，则直接调用函数
    return fn.apply(thisArg, mergeArgs);
  };

  // 绑定生成的函数的原型指向原函数的原型
  fn.prototype && (boundFunc.prototype = fn.prototype);

  // 定义函数的长度和名称
  const desc = Object.getOwnPropertyDescriptors(fn);
  Object.defineProperties(boundFunc, {
    length: Object.assign(desc.length, {
      // 需要减掉传入的args长度
      value: desc.length.value < args.length ? 0 : desc.length.value - args.length
    }),
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`
    })
  });

  return boundFunc;
}

module.exports = _bind;
