# 实现数组原型方法

## 实现`Array.prototype.forEach()`

### 功能

`forEach()`方法会对数组的每个元素执行一次给定的函数。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`**（可选） ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`forEach()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
`undefined`

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#polyfill)
```javascript
/**
 * Array.prototype._forEach
 * @returns undefined
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._forEach = function (callback, thisArg) {
    // 判断this不等于null
    if (this === null) {
        throw new TypeError('this is null or not defined');
    }

    // 判断callback是不是一个函数
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const O = Object(this);  // O === this
    const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

    let k = 0;
    while (k < len) {
        if(k in O) {  // 判断元素是否在数组中
            callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
}
```


## 实现`Array.prototype.map()`

### 功能

`map()`方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`** ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`map()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
一个由原数组每个元素执行回调函数的结果组成的新数组。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#polyfill)
```javascript
/**
 * Array.prototype._map
 * @returns <array>: 一个由原数组每个元素执行回调函数的结果组成的新数组
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._map = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  const res = [];
  while (k < len) {
    if(k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);  // 赋值各元素的结果
    }
    k++;
  }

  // 将结果数组返回
  return res;
}
```


## 实现`Array.prototype.filter()`

### 功能

`filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`** ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`filter()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#polyfill)
```javascript
/**
 * Array.prototype._filter
 * @returns <array>: 一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._filter = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  const res = [];
  while (k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)){
        res.push(O[k]);   // 如果该元素通过测试，即添加到结果数组中
      }
    }
    k++;
  }

  // 将结果数组返回
  return res;
}
```


## 实现`Array.prototype.some()`

### 功能

`some()`方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个`Boolean`类型的值。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`** ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`some()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
数组中有至少一个元素通过回调函数的测试就会返回`true`；所有元素都没有通过回调函数的测试返回值才会为`false`。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some#compatibility)
```javascript
/**
 * Array.prototype._some
 * @returns <boolean>: 数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._some = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)){
        return true;   // 只要有一个元素通过测试，即返回true
      }
    }
    k++;
  }

  // 遍历结束还没有通过测试，即返回false
  return false;
}
```


## 实现`Array.prototype.every()`

### 功能

`every()`方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`**（可选） ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`every()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
如果回调函数的每一次返回都为`truthy`值，返回`true`，否则返回`false`。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every#%E5%85%BC%E5%AE%B9%E6%97%A7%E7%8E%AF%E5%A2%83%EF%BC%88polyfill%EF%BC%89)
```javascript
/**
 * Array.prototype._every
 * @returns <boolean>: 数组中有所有元素都通过回调函数的测试就会返回true；只要一个元素没有通过回调函数的测试返回值才会为false
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._every = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if(k in O) {
      if(!callback.call(thisArg, O[k], k, O)){
        return false;   // 只要有一个元素没有通过测试，即返回false
      }
    }
    k++;
  }

  // 遍历结束都通过测试，即返回true
  return true;
}
```


## 实现`Array.prototype.find()`

### 功能

`find()`方法返回数组中满足提供的测试函数的第一个元素的值。否则返回`undefined`。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`**（可选） ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`find()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
数组中第一个满足所提供测试函数的元素的值，否则返回`undefined`。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find#polyfill)
```javascript
/**
 * Array.prototype._find
 * @returns <any>: 数组中第一个满足所提供测试函数的元素的值，否则返回 undefined
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._find = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)){
        return O[k];   // 返回第一个满足测试的元素
      }
    }
    k++;
  }

  // 如果都不通过，则返回undefined
  return undefined;
}
```


## 实现`Array.prototype.findIndex()`

### 功能

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回`-1`。

#### 参数
- **`callback`** ： 为数组中每个元素执行的函数，该函数接收三个参数
  - **`currentValue`**（可选） ：数组中正在处理的当前元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引
  - **`array`**（可选） ：`findIndex()`方法正在操作的数组
-  **`thisArg`**（可选） ：当执行回调函数`callback`时，用作`this`的值

#### 返回值
数组中通过提供测试函数的第一个元素的索引。否则，返回`-1`。

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#polyfill)
```javascript
/**
 * Array.prototype._findIndex
 * @returns <number>: 数组中通过提供测试函数的第一个元素的索引。否则，返回-1
 * @param callback<function>: executor有三个参数：currentValue、index和array
 * @param thisArg<object>
 */
Array.prototype._findIndex = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  while (k < len) {
    if(k in O) {
      if(callback.call(thisArg, O[k], k, O)){
        return k;   // 返回第一个满足测试的元素索引
      }
    }
    k++;
  }

  // 如果都不通过，则返回-1
  return -1;
}
```


## 实现`Array.prototype.reduce()`

### 功能

`reduce()`方法对数组中的每个元素执行一个由您提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。

`reducer`函数接收4个参数:

- Accumulator (`acc`) (累计器)
- Current Value (`cur`) (当前值)
- Current Index (`idx`) (当前索引)
- Source Array (`src`) (源数组)

您的`reducer`函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

#### 参数
- **`callback`** ： 执行数组中每个值 (如果没有提供`initialValue`则第一个值除外)的函数，包含四个参数：
  - **`accumulator`** ：累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`
  - **`currentValue`** ：数组中正在处理的元素
  - **`index`**（可选） ：数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始
  - **`array`**（可选） ：`reduce()`方法正在操作的数组
-  **`initialValue`**（可选） ：作为第一次调用`callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用`reduce`将报错

#### 返回值
函数累计处理的结果

### 实现
> [参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#polyfill)
```javascript
/**
 * Array.prototype._reduce
 * @returns <any>: 函数累计处理的结果
 * @param callback<function>: executor有四个参数：accumulator、currentValue、index和array
 * @param initialValue<any>: 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错
 */
Array.prototype._reduce = function (callback, initialValue) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this); // O === this
  const len = O.length >>> 0; // 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0

  let k = 0;
  let acc;

  if(arguments.length > 1){
    acc = initialValue;
  } else {
    // 没传入初始值的时候，取数组第一个非empty的值为初始值
    while (k < len && !(k in O)){
      k++;
    }
    if( k > len){
      throw new TypeError('Reduce of empty array with no initial value');
    }
    acc = O[k++]; // 后续遍历从k+1开始遍历
  }

  while (k < len) {
    if(k in O) {
      acc = callback.call(acc, O[k], k, O)
    }
    k++;
  }

  return acc;
}
```
