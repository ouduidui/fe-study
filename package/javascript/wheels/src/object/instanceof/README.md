# 实现 instanceof 运算符

## 思路

`instanceof` **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。



我们这里通过一个`instanceOf(object, constructor)`函数来实现，它接收两个参数，分别为实例对象和构造函数。

实例对象的原型链上存在该构造函数，则返回`true`，否则返回`false`。

## 实现

```javascript
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
```