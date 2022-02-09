# 柯里化函数

## 思路

**柯里化（Currying）**，又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

核心思想是把多参数传入的函数拆成单参数（或部分）函数，内部再返回调用下一个单参数（或部分）函数，依次处理剩余的参数。



我们通过一个例子来更直观了解函数柯里化：

```javascript
const add = function(a, b, c, d) {
    return a + b + c + d
}

// 把本来接收多个参数一次性求和的函数改成了接收单一参数逐个求和的函数
const curryAdd = curry(add);

console.log(add(1,2,3,4))   // 10
console.log(currAdd(1)(2)(3)(4))  // 10
```

柯里化函数接收一个参数，为目标函数，然后它会返回一个处理后的函数。

## 实现

```javascript
/**
 * 函数柯里化
 * @author 欧怼怼
 * @param fn {function(...[*]): *}
 * @return {function(...[*]): *}
 */
function curry(fn) {
  return function (...args) {
    // 如果参数超出一个，报错
    if (args.length > 1) {
      throw new Error('只能传递一个参数');
    }

    // 当fn.length为1的时候，代表是最后一次调用函数了
    if (fn.length === 1) {
      return fn.apply(this, args);  // 调用函数返回结果
    } else {
      // 如果还是缺少参数，则返回函数继续调用
      return curry(fn.bind(this, ...args));
    }
  };
}
```