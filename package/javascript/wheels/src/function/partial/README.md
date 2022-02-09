# 偏函数

## 思路

**偏函数（Partial）**，它跟柯里化函数很类似。

偏函数的功能是固定一个函数的一些参数，然后产生另一个更少参数的函数。我们还是通过一个例子来认识一下：

```javascript
const add = function(a, b, c, d) {
    return a + b + c + d
}

// partialAdd已经固定了a、b参数，它目前只接收两个参数，即c、d参数
const partialAdd = partial(add, 1, 2);

console.log(partialAdd(3, 4))  // 10
```

偏函数的第一个参数为目标函数，后续可接收多个参数作为固定参数。然后它会返回一个处理后的函数。

## 实现

```javascript
/**
 * 偏函数
 * @author 欧怼怼
 * @param fn {function(...[*]): *}
 * @param args {*}
 * @return {function(...[*]): *}
 */
function partial(fn, ...args) {
  return function (...newArgs) {
    return fn.call(this, ...args, ...newArgs);
  };
}
```