/**
 * 实现 instanceof 运算符
 * @author 欧怼怼
 * @param object {object}
 * @param constructor {object}
 * @return {boolean}
 */
function instanceOf(object, constructor) {
  // 获取构造函数的原型对象
  const cp = constructor.prototype;
  // 获取对象的原型对象
  let oc = object.__proto__;

  // 递归遍历
  while (oc) {
    if (oc === cp) {
      return true;
    }
    // 顺着原型链继续查找原型对象
    oc = oc.__proto__;
  }

  // 如果原型链走完了还没找到，则返回错误
  return false;
}

module.exports = instanceOf;
