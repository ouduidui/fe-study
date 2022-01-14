# 数组原生方法

## forEach

### 需求

`forEach()` 方法对数组的每个元素执行一次给定的函数。

它接收两个参数，分别为`callback`和`thisArg`。

- `callback`：为数组中每个元素的执行函数，该函数接收一至三个参数

  - `currentValue`：数组正在处理的当前元素

  - `index`：可选，数组正在处理的当前元素的索引

  - `array`：可选，方法正在操作的数组

- `thisArg`：可选参数。是当执行回调函数`callback`时，用在`this`的值

`forEach`没有返回值。

### 实现

```javascript
/**
 * 实现 _forEach
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => void}
 * @param thisArg {object | undefined}
 * @returns {void}
 */
const _forEach = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    let index = 0;
    // 遍历数组
    while (index < len) {
      // 使用call调用函数
      callback.call(thisArg, arr[index], index, arr);
      index++;
    }
  };
```

## map

### 需求

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

它的接收参数跟`forEach`一致，这里就不多说了。

`map()`方法会放毁一个由原数组每个元素执行回调函数的结果组成的新数组。

### 实现

```javascript
/**
 * 实现数组原型方法 map
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => *}
 * @param thisArg {object | undefined}
 * @returns {*[]}
 */
const _map = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;
    // 初始化返回数组
    const newArr = [];

    let index = 0;
    // 遍历数组
    while (index < len) {
      // 将返回值保存到newArr
      newArr[index] = callback.call(thisArg, arr[index], index, arr);
      index++;
    }

    // 返回新数组
    return newArr;
  };
```

## filter

### 需求

`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

它的接收参数跟`forEach`一致，这里就不多说了。

`filter()`会返回一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

### 实现

```javascript
/**
 * 实现数组原型方法 filter
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {*[]}
 */
const _filter = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    const newArr = [];
    let index = 0;

    // 遍历数组
    while (index < len) {
      // 如果通过回调函数的测试，则添加到newArr
      if (callback.call(thisArg, arr[index], index, arr)) {
        newArr.push(arr[index]);
      }
      index++;
    }

    // 返回新数组
    return newArr;
  };
```

## find

### 需求

`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。

它的接收参数跟`forEach`一致，这里就不多说了。

### 实现

```javascript
/**
 * 实现数组原型方法 find
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {*}
 */
const _find = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    let index = 0;
    // 遍历数组
    while (index < len) {
      // 当有一个满足测试函数就立即返回
      if (callback.call(thisArg, arr[index], index, arr)) {
        return arr[index];
      }
      index++;
    }

    // 如果没有一个满足条件的话则返回 undefined
    return undefined;
  };
```

## findIndex

### 需求

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。

它的接收参数跟`forEach`一致，这里就不多说了。

### 实现

这个其实只需要在`find`的基础上修改一下返回值就可以了：

```javascript
/**
 * 实现数组原型方法 findIndex
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {number}
 */
const _findIndex = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    let index = 0;
    // 遍历数组
    while (index < len) {
      // 当有一个满足测试函数就立即返回对应的索引
      if (callback.call(thisArg, arr[index], index, arr)) {
        return index;
      }
      index++;
    }

    // 如果没有一个满足条件的话则返回-1
    return -1;
  };
```

## every

### 需求

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

> **注意**：若收到一个空数组，此方法在一切情况下都会返回 `true`。

它的接收参数跟`forEach`一致，这里就不多说了。

### 实现

```javascript
/**
 * 实现数组原型方法 every
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {boolean}
 */
const _every = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    let index = 0;
    // 遍历数组
    while (index < len) {
      // 但凡有一个没有通过测试，则返回false
      if (!callback.call(thisArg, arr[index], index, arr)) {
        return false;
      }
    }

    // 遍历结束都通过测试，即返回true
    return true;
  };
```

## some

### 需求

`some()` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

> **注意**：如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

它的接收参数跟`forEach`一致，这里就不多说了。

### 实现

```javascript
/**
 * 实现数组原型方法 some
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {boolean}
 */
const _some = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    let index = 0;
    while (index < len) {
      if (callback.call(thisArg, arr[index], index, arr)) {
        // 只要有一个元素通过测试，即返回true
        return true;
      }
      index++;
    }

    // 遍历结束还没有通过测试，即返回false
    return false;
  };
```

## reduce

### 需求

`reduce()` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

它接收两个参数，分别为`reducer`和`initialValue`。

- `callback`：为`reducer`函数，它接收四个参数：

  - `accumulator`：累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`

  - `currentValue`：数组中正在处理的元素

  - `index`：可选，数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始

  - `array`：可选，调用`reduce()`的数组

- `initialValue`：可选参数。作为第一次调用`callback`函数时第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用`callback` 将报错。

`reduce`会返回函数累计处理的结果。

### 实现

```javascript
/**
 * 实现数组原型方法 some
 * @author OUDUIDUI
 * @param callback {(accumulator: *, currentValue: *, index?: number, array?: *[]) => *}
 * @param initialValue {*}
 * @returns {*}
 */
const _reduce = function (callback, initialValue) {
    // 判断this不等于null
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const arr = this;
    const len = arr.length;

    // 在没有初始值的空数组上调用callback将报错
    if (len === 0 && initialValue === undefined) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    let index = 0;
    let accumulator = initialValue;
    // 没传入初始值的时候，取数组第一个值为初始值
    if (initialValue === undefined) {
      index = 1;
      accumulator = arr[0];
    }

    // 遍历调用
    while (index < len) {
      // 更新accumulator
      accumulator = callback(accumulator, arr[index], index, arr);
      index++;
    }

    // 返回累计处理的结果
    return accumulator;
  };
```