# 函数原生方法

## call

### 思路

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。



它接收多个参数：

- `thisArg`：可选的。为`Function`函数运行时使用的`this`值

- `arg1、arg2...`：指定的参数列表

它返回使用调用者提供的 `this` 值和参数调用该函数的返回值。

### 实现

```javascript
/**
 * 实现函数原生方法 call
 * @param thisArg {*} this上下文
 * @param args {*[]} 参数
 * @return {*}
 */
function _call(thisArg, ...args) {
  // 如果没有传thisArg默认为全局
  if (!thisArg) {
    thisArg = window !== undefined ? window : global;
  }

  // 有可能thisArg传的不是对象
  thisArg = Object(thisArg);

  // 使用Symbol确保唯一值
  const fnKey = Symbol();
  // 将函数绑定到thisArg上
  thisArg[fnKey] = this;

  // 调用函数
  const result = thisArg[fnKey](...args);
  // 删除函数
  delete thisArg[fnKey];

  return result;
}
```

## apply

### 思路

`apply()` 方法调用一个具有给定`this`值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

> `apply()`方法的作用跟`call()`方法类似，区别就是`call()`方法接受的是**参数列表**，而`apply()`方法接受的是**一个参数数组**。因此它们实现上也大同小异。



它接收两个参数：

- `thisArg`：可选的。为`Function`函数运行时使用的`this`值

- `argsArray`：可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数

它返回使用调用者提供的 `this` 值和参数调用该函数的返回值。

### 实现

```javascript
/**
 * 实现函数原生方法 apply
 * @author 欧怼怼
 * @param thisArg {object} this上下文
 * @param argsArray {*[]} 参数
 * @return {*}
 */
function _apply(thisArg, argsArray) {
  if (!thisArg) {
    thisArg = window !== undefined ? window : global;
  }

  // 处理参数
  if (!argsArray) {
    argsArray = [];
  }

  thisArg = Object(thisArg);

  const fnKey = Symbol();
  thisArg[fnKey] = this;

  const result = thisArg[fnKey](...argsArray);
  delete thisArg[fnKey];

  return result;
}
```

## bind

### 思路

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。



它接收多个参数：

- `thisArg`：调用绑定函数时作为 `this` 参数传递给目标函数的值

- `arg1、arg2...`：当目标函数被调用时，被预置入绑定函数的参数列表中的参数

它返回返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。



并且，`bind`还有以下特性：

- 返回的新函数被`new`调用作为构造函数时，绑定的值会指向并改为`new`的指定对象
- 返回的新函数存在`length`属性和`name`属性
- 绑定后的函数的`prototype`需要指向原函数的`prototype`

### 实现

```javascript
/**
 * 实现函数原生方法 bind
 * @author 欧怼怼
 * @param thisArg {object} this上下文
 * @param args {*[]} 参数
 * @return {(function(...[*]=): (*))}
 * @private
 */
function _bind(thisArg, ...args) {
  const fn = this; // 获取函数
  // 封装新的函数
  const boundFunc = function (...args1) {
    // 合并参数
    const mergeArgs = args.concat(args1);
    // 判断是否使用new关键字创建实现
    if (new.target) {
      const result = fn.apply(this, mergeArgs);
      // 如果返回值为对象或方法，则直接返回
      if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result;
      }
      // 否则返回this
      return this;
    }

    // 如果不是new关键字，则直接调用函数
    return fn.apply(thisArg, mergeArgs);
  };

  // 绑定生成的函数的原型指向原函数的原型
  fn.prototype && (boundFunc.prototype = fn.prototype);

  // 定义函数的长度和名称
  const desc = Object.getOwnPropertyDescriptors(fn);
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