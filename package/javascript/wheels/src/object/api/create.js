/**
 * 实现 Object.create 方法
 * @author 欧怼怼
 * @param proto {object | null}
 * @param propertiesObject {object | undefined}
 * @return {object}
 */
function create(proto, propertiesObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.');
  }
  if (propertiesObject === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  function F() {}
  F.prototype = proto; // 绑定原型
  const obj = new F(); // 新建实例对象

  // 自定义属性
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  if (proto === null) {
    obj.__proto__ = null; // 如果proto为null，将清空原型
  }
  return obj;
}

module.exports = create;
