function _apply(context, args = []) {
  context = context || window;

  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];

  return res
}

module.exports = _apply;
