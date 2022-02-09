/**
 * 实现寄生式组合继承
 * @author 欧怼怼
 * @param child {*}
 * @param parent {*}
 */
function extend(child, parent) {
  // 以父类原型对象作为原型初始一个对象
  let prototype = Object.create(parent.prototype);
  // 绑定子类构造函数
  prototype.constructor = child;
  // 将prototype对象绑定到子类原型上
  child.prototype = prototype;
}

module.exports = extend;
