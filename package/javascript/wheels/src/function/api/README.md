# Function原型方法

## call

`call`方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。

因此实现该方法的关键点就在于指定的`this`上下文，以及传入的参数。

### 实现

```javascript
/**
 * @param context {object} this上下文
 * @param args {*[]} 参数
 * @return {*}
 */
function _call(context, ...args) {
  // 处理没有传this的情况
  if(!context) {
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
```

## apply

`apply`核心跟`call`基本相同。它们唯一的不同点在于`call`接收的是一个参数列表，而`apply`接收的是一个包含多个参数的数组。

### 实现

```javascript
/**
 * @param context {object} this上下文
 * @param args {*[]} 参数
 * @return {*}
 */
function _apply(context, args = []) {
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
```

## bind

`bind`不同于前面两个，最大的区别在于它不会立即执行函数，而是会返回一个新的函数，并且新的函数会绑定传入的`this`以及参数。

并且，`bind`还有以下特性：
- 返回的新函数被`new`调用作为构造函数时，绑定的值会指向并改为`new`的指定对象
- 返回的新函数存在`length`属性和`name`属性
- 绑定后的函数的`prototype`需要指向原函数的`prototype`

> 真实情况中绑定后的函数是没有 `prototype` 的，取而代之在绑定后的函数中有个内部属性 `[[TargetFunction]]` 保存原函数，当将绑定后函数作为构造函数时，将创建的实例的 `__proto__` 指向 `[[TargetFunction]]` 的 `prototype`，这里无法模拟内部属性，所以直接声明了一个 `prototype` 属性

### 实现

```javascript
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
    if (new.target) {   // 使用new创建实例
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
```