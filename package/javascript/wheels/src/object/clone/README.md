# 深浅拷贝

## 浅拷贝

### 思路

不管是现在浅拷贝，还是后面的深拷贝，**都只是针对引用类型的**，因为引用类型是存放在堆内存中，在栈地址有一个或者多个地址来指向推内存的某一数据。

浅拷贝仅仅是复制了最外层的对象，而对于对象内的引用类型，依旧是原来的元素，而只是复制了引用。因此如果我们修改了新对象中的任一引用类型，原对象中对应的引用类型也会随之修改。

我们可以通过下面的代码了解一下：

```javascript
const obj = {
    a: {b: 1}
};
// 通过浅拷贝生成新的对象
const newObj = shallowCopy(obj);
console.log(newObj);   // {a: {b: 1}}

newObj.a.b = 2;
console.log(newObj);   // {a: {b: 2}}
console.log(obj);   // {a: {b: 2}}
```

### 实现

```javascript
/**
 * 实现浅拷贝
 * @author 欧怼怼
 * @param obj {*}
 * @return {*}
 */
function shallowCopy(obj) {
  // 如果不是对象，直接返回
  if (typeof obj !== 'object' || obj === null) return obj;

  // 初始化对象
  let newObj = Array.isArray(obj) ? [] : {};

  // 遍历obj，一一插入新对象
  for (let key in obj) {
    obj.hasOwnProperty(key) && (newObj[key] = obj[key]);
  }

  return newObj;
}
```

## 深拷贝

### 思路

深拷贝则解决了浅拷贝的引用问题，它会不断递归元素对象，一一复制过来，而不是只拷贝引用地址。因此返回的新对象跟之前的对象，之间就不会存在任何绑定关系，任意修改其中一个的元素对另外一个也不会有影响。

```javascript
const obj = {
    a: {b: 1}
};
// 通过深拷贝生成新的对象
const newObj = deepClone(obj);
console.log(newObj);   // {a: {b: 1}}

newObj.a.b = 2;
console.log(newObj);   // {a: {b: 2}}
console.log(obj);   // {a: {b: 1}}
```

### 实现

#### 简单粗暴版本

```javascript
/**
 * 简单粗暴版本深拷贝
 * @author 欧怼怼
 * @param obj {*}
 * @return {*}
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
```

这种方法虽然很简单粗暴，但是存在一定的缺陷，如果`obj`内存在函数、`symbol`、`undefined`元素，都会被忽略掉。

#### 简单版本

其实我们可以模仿浅拷贝的代码，然后再最后赋值的时候，判断`value`是否为对象，是的话再调用一下自身进行递归深拷贝，不是的话直接复制。

```javascript
/**
 * 实现简单版深拷贝
 * @author 欧怼怼
 * @param obj {*}
 * @return {*}
 */
function deepClone(obj) {
  // 如果不是对象，直接返回
  if (typeof obj !== 'object' || obj === null) return obj;
  // 初始化对象
  const newObj = Array.isArray(obj) ? [] : {};
  // 遍历obj，一一插入新对象
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果是对象的话，再调用一下deepClone进行一次深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

当然，这个方法还是会存在一些问题，比如遇到一些循环引用，就可能陷入死循环了，比如下面的例子：

```javascript
const obj = {a: 1};
obj.b = obj;
```

如果上面的对象进行调用上面的深拷贝就会陷入死循环。  当然对于一些特殊对象的处理也存在一些问题，因此我们可以实现一个比较全面的深拷贝函数。

#### 复杂版本深拷贝

首先我们实现一下对对象类型的判断函数，并且将其分为可遍历类型和不可遍历类型。

```javascript
// 可遍历类型
const MAP_TAG = '[object Map]'; // Map
const SET_TAG = '[object Set]'; // Set
const WEAK_MAP_TAG = '[object WeakMap]'; // WeakMap
const WEAK_SET_TAG = '[object WeakSet]'; // WeakSet
const ARRAY_TAG = '[object Array]'; // Array
const OBJECT_TAG = '[object Object]'; // Object
const ARGUMENTS_TAG = '[object Arguments]'; // Argument
const CAN_TRAVERSE_TYPE = [MAP_TAG, SET_TAG, WEAK_MAP_TAG, WEAK_SET_TAG, ARRAY_TAG, OBJECT_TAG, ARGUMENTS_TAG];

// 不可以遍历类型
const BOOLEAN_TAG = '[object Boolean]'; // Boolean
const NUMBER_TAG = '[object Number]'; // Number
const STRING_TAG = '[object String]'; // String
const SYMBOL_TAG = '[object Symbol]'; // Symbol
const DATE_TAG = '[object Date]'; // Date
const ERROR_TAG = '[object Error]'; // Error
const REGEXP_TAG = '[object RegExp]'; // RegExp
const FUNC_TAG = '[object Function]'; // Function

/**
 * 判断是否为对象
 * @param target {*}
 * @returns {boolean}
 */
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

/**
 * 获取对象类型
 * @param obj {Object}
 * @returns {string}
 */
const getType = (obj) => Object.prototype.toString.call(obj);
```

接下来初始化一下深拷贝函数。跟前面一下，先判断是否为对象或数组，如果不是的话直接返回数据，否则则继续进行拷贝流程。

然后获取对象的具体类型，判断判断是否为不可遍历状态，如果是的话调用`handleNotTraverse`进行特殊处理。

```javascript
function deepClone(target) {
  // 如果不是对象或函数的话，代表为原始类型，直接返回
  if (!isObject(target)) return target;

  // 获取对象类型
  const type = getType(target);

  // 如果是不可遍历状态，调用handleNotTraverse进行处理
  if (!CAN_TRAVERSE_TYPE.includes(type)) return handleNotTraverse(target, type);
}
```

接下来来实现`handleNotTraverse`。

在不可遍历对象类型中，对于Boolean对象，String对象，Number对象和Symbol对象而言，我们只需要重新创建个实例返回就可以了；而对于Error对象，则直接返回；对于Date对象也是重新创建个实例返回；最后的正则和函数，后面我们再特殊处理。

```javascript
/**
 * 处理不可以遍历类型
 * @param target {*}
 * @param type {string}
 * @returns {*}
 */
function handleNotTraverse(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case BOOLEAN_TAG:
      return new Object(Boolean.prototype.valueOf.call(target));
    case NUMBER_TAG:
      return new Object(Number.prototype.valueOf.call(target));
    case STRING_TAG:
      return new Object(String.prototype.valueOf.call(target));
    case SYMBOL_TAG:
      return new Object(Symbol.prototype.valueOf.call(target));
    case ERROR_TAG:
      return target;
    case DATE_TAG:
      return new Ctor(target);
    case REGEXP_TAG:
      return regExpTypeHandle(target);
    case FUNC_TAG:
      return functionTypeHandle(target);
    default:
      return new Ctor(target);
  }
}
```

对于正则，我们需要获取对于的`source`模板文本和`flags`标志，然后新建正则对象返回：

```javascript
/**
 * 处理正则类型
 * @param target {RegExp}
 * @return {RegExp}
 */
function regExpTypeHandle(target) {
  const { source, flags } = target;
  return new target.constructor(source, flags);
}
```

对于函数，我们需要分别获取函数内容和函数参数，然后通过`new Function`新建函数返回。

但对于箭头函数，因为他本身是没有原型的，因此直接返回。

```javascript
/**
 * 处理函数类型
 * @param target {Function}
 * @return {Function | null}
 */
function functionTypeHandle(target) {
  // 箭头函数
  if (!target.prototype) return target;

  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcStr = target.toString();

  // 函数内容
  const body = bodyReg.exec(funcStr);
  if (!body) return null;

  // 参数
  const param = paramReg.exec(funcStr);
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
}
```

处理完不可遍历对象，剩下的可遍历对象就容易多了，跟之前的一样就行。

而对于`Map`要注意一点，就是它的`key`是可以为对象的，因此我们也需要调用一次`deepClone`。

```javascript
function deepClone(target) {
  // 如果不是对象或函数的话，代表为原始类型，直接返回
  if (!isObject(target)) return target;

  // 获取对象类型
  const type = getType(target);

  // 如果是不可遍历状态，调用handleNotTraverse进行处理
  if (!CAN_TRAVERSE_TYPE.includes(type)) return handleNotTraverse(target, type);

  // 继承对象的原型，可以保证target原型不丢失
  const Ctor = target.constructor;
  const newTarget = new Ctor();

  switch (type) {
    // Map 和 WeakMap 类型
    case MAP_TAG || WEAK_MAP_TAG:
      target.forEach((val, key) => newTarget.set(deepClone(key), deepClone(val)));
      break;

    // Set 和 WeakSet 类型
    case SET_TAG || WEAK_SET_TAG:
      target.forEach((item) => newTarget.add(deepClone(item)));
      break;

    default:
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          newTarget[key] = deepClone(target[key]);
        }
      }
      break;
  }

  return newTarget;
}
```

最后就来解决一下嵌套引用的问题。这里我们可以使用一个`WeakSet`来记录已经拷贝过的对象，然后每一次调用进行拷贝前，先去查一下`WeakSet`是否存在过该对象，存在的话直接返回，不存在再继续执行。

```javascript
function deepClone(target, valSet = new WeakSet()) {
  // 如果不是对象或函数的话，代表为原始类型，直接返回
  if (!isObject(target)) return target;

  // 获取对象类型
  const type = getType(target);

  // 如果是不可遍历状态，调用handleNotTraverse进行处理
  if (!CAN_TRAVERSE_TYPE.includes(type)) return handleNotTraverse(target, type);

  if (valSet.has(target)) return target; // 判断是否拷贝过此target

  valSet.add(target); // 记录当前target

  // 继承对象的原型，可以保证target原型不丢失
  const Ctor = target.constructor;
  const newTarget = new Ctor();

  switch (type) {
    // Map 和 WeakMap 类型
    case MAP_TAG || WEAK_MAP_TAG:
      target.forEach((val, key) => newTarget.set(deepClone(key, valSet), deepClone(val, valSet)));
      break;

    // Set 和 WeakSet 类型
    case SET_TAG || WEAK_SET_TAG:
      target.forEach((item) => newTarget.add(deepClone(item, valSet)));
      break;

    default:
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          newTarget[key] = deepClone(target[key], valSet);
        }
      }
      break;
  }

  return newTarget;
}
```
