# 实现Object原生方法

## 实现Object.is

### 思路

`Object.is()`方法是来判断两个值是否为同一个值。它的比较方式跟`===`大致相同，只有两个例外：

- `NaN === NaN`是为false的，但`Object.is(NaN, NaN)`是为true的；

- `+0 === -0`是为true的，但`Object.is(+0, -0)`是为false的

`Object.is()`接收两个参数，然后返回一个`boolean`值，标示两个参数是否相等。

### 实现

```javascript
/**
 * 实现 Object.is 方法
 * @author 欧怼怼
 * @param value1 {*}
 * @param value2 {*}
 * @return {boolean}
 */
function is(value1, value2) {
  if (value1 === value2) {
    // 此时只需要识别 +0 和 -0 的情况
    // 通过 1 / +0 = Infinity 和 1 / -0 = -Infinity 的原则来识别
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }

  // 此时需要识别 NaN
  // 通过 NaN !== NaN 来识别
  return value1 !== value1 && value2 !== value2;
}
```

## 实现Object.create

### 思路

`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。

它接收两个参数：

- `proto`：新创建对象的原型对象，只能是对象或null，否则会报错；

- `propertiesObject`
  ：可选，需要传入一个对象，该对象的属性类型参照[Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)的第二个参数。如果传入`null`会报错。

然后该函数会返回一个新对象，带着指定原型对象和属性。

### 实现

```javascript
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

  function F() {
  }

  F.prototype = proto;  // 绑定原型
  const obj = new F();   // 新建实例对象

  // 自定义属性
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  if (proto === null) {
    obj.__proto__ = null;  // 如果proto为null，将清空原型
  }
  return obj;
}

module.exports = create;
```

## 实现Object.assign

### 思路

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

它接收多个参数，第一个为目标对象`target`，后面则为`sources`源对象。

然后它将会返回一个目标对象，并且传入的`target`目标对象也会发生变化。

### 实现

```javascript
/**
 * 实现 Object.assign 方法
 * @author 欧怼怼
 * @param target {object}
 * @param sources {object[]}
 * @return {object}
 */
function assign(target, ...sources) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  // 遍历sources
  for (const obj of sources) {
    if (obj === null) continue;

    // 遍历obj
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key];
      }
    }
  }

  return target;
}
```