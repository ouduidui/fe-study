/**
 * @param context {object} this上下文
 * @param args {*[]} 参数
 * @return {(function(...[*]=): (*))}
 * @private
 */
function _bind(context, ...args) {
  const self = this;
  // 封装新的函数
  const boundFunc = function (...args1) {
    if (new.target) {
      // 使用new创建实例
      const res = self.apply(this, args.concat(args1));
      // 如果返回值为对象或方法，直接返回
      if ((typeof res === 'object' || typeof res === 'function') && res !== null) {
        return res;
      }
      // 否则返回this
      return this;
    } else {
      // 调用函数
      return self.apply(context, args.concat(args1));
    }
  };

  // 绑定后的函数的prototype需要指向原函数的prototype
  if (self.prototype) {
    boundFunc.prototype = self.prototype;
  }

  // 定义函数的长度length和名字name
  const desc = Object.getOwnPropertyDescriptors(self);
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
