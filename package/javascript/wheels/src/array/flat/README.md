# 数组扁平化（flat）

## 需求

该方法就是将一个多维数组扁平化。也就是遍历数组，然后将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```javascript
const arr1 = [0, 1, 2, [3, 4], [5, [6, 7]]];
console.log(arr1.flat())   // [0, 1, 2, 3, 4, 5, 6, 7]

```

## 简单实现

### 使用reduce实现

```javascript
/**
 * 使用reduce实现简易版扁平化
 * @author OUDUIDUI
 * @param array {*[]}
 * @returns {*[]}
 */
const flat = function (array) {
  return array.reduce((acc, cur) => {
    return acc.concat(
      Array.isArray(cur)
        ? flat(cur) //  如果是数组的话，在递归调用flat
        : cur
    );
  }, []);
};
```

### 使用栈实现

```javascript
/**
 * 使用栈实现简易版扁平化
 * @author OUDUIDUI
 * @param array {*[]}
 * @returns {*[]}
 */
const flat = function (array) {
  const stack = [...array];
  const result = [];

  while (stack.length > 0) {
    // 弹出最后一个值
    const val = stack.pop();
    if (Array.isArray(val)) {
      // 如果是数组的话解体再入栈
      stack.push(...val);
    } else {
      // 往数组前面推入
      result.unshift(val);
    }
  }

  return result;
};
```

## 完整版本实现

如果使用过`Array.prototype.flat`的话，会发现它可以接收一个`depth`可选参数，用于定要提取嵌套数组的结构深度，而默认的话`depth`为1。

我们可以将其实现一下，并且额外设定如果`depth`为`-1`的话，就全部扁平化。



先看看测试代码：

```javascript
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat())    // [0, 1, 2, [[3, 4]]]
console.log(arr2.flat(1))   // [0, 1, 2, [3, 4]]
console.log(arr2.flat(2))   // [0, 1, 2, 3, 4]
console.log(arr2.flat(-1))   // [0, 1, 2, 3, 4]
```

实现：

```javascript
/**
 * 完整版数组扁平化
 * @author OUDUIDUI
 * @param array {*[]}
 * @param depth {number}
 * @returns {*[]}
 */
const flat = function (array, depth = 1) {
  if (depth === -1) {
    return array.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? flat(cur, -1) : cur);
    }, []);
  } else {
    return depth > 0
      ? array.reduce((acc, cur) => {
          return acc.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
        }, [])
      : array;
  }
};
```