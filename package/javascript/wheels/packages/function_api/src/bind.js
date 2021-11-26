function _bind(context, ...args) {
  const self = this;
  const boundFunc = function (...args1) {
    // 实现可以对返回函数 new 示例
    return self.apply(new.target ? this : context, args.concat(args1));
  }

  if(self.prototype) {
    boundFunc.prototype = Object.create(self.prototype);
  }

  const desc = Object.getOwnPropertyDescriptors(self);
  Object.defineProperties(boundFunc, {
    length: Object.assign(desc.length, {
      value: desc.length.value < args.length ? 0 : (desc.length.value - args.length)
    }),
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`
    })
  });
  return boundFunc;
}

module.exports = _bind;
