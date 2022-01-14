# 数组去重（unique）

## 需求

该方法是用于数组去重的，接收一个参数，即需要去重的数组，然后会返回一个去重后的新数组。

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const arr = [1, 2, 3, 2, 'a', 'b', 'c', 'e', 'b', obj1, obj2, obj1];
console.log(unique(arr))  // [1, 2, 3, 'a', 'b', 'c', 'e', {a: 1}, {a: 1}]
```

## 实现

### for+splice实现

```javascript
/**
 * for + splice 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  const _arr = [...arr];
  for (let i = 0; i < _arr.length; i++) {
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[i] === _arr[j]) {
        _arr.splice(j, 1);
        j--; // 此时已经删除一个元素，记得 j - 1
      }
    }
  }
  return _arr;
}
```

### indexOf或includes实现

```javascript
/**
 * indexOf | include 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  const _arr = [];
  for (let i = 0; i < arr.length; i++) {
    // (_arr.indexOf(arr[i]) === -1) && _arr.push(arr[i]);
    !_arr.includes(arr[i]) && _arr.push(arr[i]);
  }
  return _arr;
}
```

### filter + indexOf实现

```javascript
/**
 * filter + indexOf 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}
```

### reduce + includes实现

```javascript
/**
 * reduce + includes 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);
}
```

### ES6 Set实现

> 可以使用ES6的Set集合实现，利用它的值是唯一的特性。

```javascript
/**
 * ES6 Set 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  return [...new Set(arr)];
}
```