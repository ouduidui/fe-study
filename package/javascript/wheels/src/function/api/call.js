/**
 * @param context {object} this上下文
 * @param args {*[]} 参数
 * @return {*}
 */
function _call(context, ...args) {
  // 处理没有传this的情况
  if (!context) {
    context = typeof window !== 'undefined' ? window : global;
  }
  // context有可能传的不是对象
  context = Object(context);

  // 用Symbol生成唯一的key
  const fn = Symbol();
  // 将函数赋值到context上
  context[fn] = this;

  // 调用函数，并获取返回值
  const res = context[fn](...args);
  // 在上下文中删除函数
  delete context[fn];

  // 返回结果
  return res;
}

module.exports = _call;
