/**
 * 实现 new 运算符
 * @author 欧怼怼
 * @param constructor {*}
 * @param args {*[]}
 * @return {*}
 */
function newObject(constructor, ...args) {
  // 新建一个空对象，并将原型指向constructor
  const obj = Object.create(constructor.prototype);
  // 以该对象为this上下文执行constructor构造函数
  const result = constructor.apply(obj, args);

  // 如果函数有返回对象的话，直接返回函数返回值，否则返回obj
  if ((typeof result === 'object' && result !== null) || typeof result === 'function') {
    return result;
  } else {
    return obj;
  }
}

module.exports = newObject;
