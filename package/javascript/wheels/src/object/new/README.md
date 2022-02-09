# 实现new运算符

## 思路

**`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。



首先我们先捋清`new`运算符创建实例的时候做了些什么事情：

- 首先它会创建一个空对象；

- 其次将对象的原型指向构造函数，即声明一个`__proto__`属性，指向构造函数的原型对象`prototype`；

- 接着将对象作为构造函数的执行上下文，然后执行一下构造函数；

- 最后判断构造函数的执行结果是否为对象，是的话直接返回该执行结果，不是的话返回前面我们创造的对象



这里我们将实现一个`newObject(constructor, ...args)`函数，它的第一个参数接收构造函数，其余参数将作为构造函数执行的参数。最后它将返回创建后的实例对象。

## 实现

```javascript
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
```