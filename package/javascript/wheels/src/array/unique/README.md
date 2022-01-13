# 数组去重

## for + splice 实现

```javascript
function unique(arr) {
  const _arr = [...arr];
  for (let i = 0; i < _arr.length; i++) {
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[i] === _arr[j]) {
        _arr.splice(j, 1);
        j--;
      }
    }
  }
  return _arr;
}
```

## indexOf | includes 实现

```javascript
function unique(arr) {
  const _arr = [];
  for (let i = 0; i < arr.length; i++) {
    // (_arr.indexOf(arr[i]) === -1) && _arr.push(arr[i]);
    !_arr.includes(arr[i]) && _arr.push(arr[i]);
  }
  return _arr;
}
```

## filter + indexOf 实现

```javascript
function unique(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}
```

## reduce + include 实现

```javascript
function unique(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);
}
```

## Set 实现

```javascript
function unique(arr) {
  return [...new Set(arr)];
}
```
