# 时间切片

## 思路

首先来简单讲一下什么是时间切片。

我们都知道一般页面16ms刷新一次，但如果我们的任务超过16ms的话，可能会产生丢帧的情况。因此我们就可以使用时间切片去对一个长时间的任务进行切片拆分。

而在react的虚拟DOM操作上，就用到了时间切片。具体可以看看[这篇文章](https://juejin.cn/post/6844904134945030151)，这里就不多花时间去讲概念问题了。



而对于时间切片的实现，我们可以用到ES6的迭代器来实现，也就是Generator生成器函数，如果对这个概念不熟悉的朋友可以去[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)学习一下。

接下来我们来实现一下。

## 实现

如果熟悉EventLoop的话，应该知道当一次事件循环结束后，就会刷新一次页面，因此我们只使用`setTimeout`将下一个任务切片设置为一个新的宏任务就可以了。

```javascript
/**
 * 简单版时间切片
 * @author 欧怼怼
 * @param generator {*}
 * @return {(function(): void)|*}
 */
function timeSlicing(generator) {
  if (typeof generator === 'function') generator = generator();

  if (!generator || typeof generator.next !== 'function') return;

  return function next() {
    let res = generator.next();
    if (res.done) return;
    // next会在下一个宏任务执行
    setTimeout(next);
  };
}



// 使用
button.onclick = timeSlicing(function* () {
  while (true) {
    doSomething();
    yield;
  }
});
```

当然我们可以来完善一下。

因为我们其实没法准确保证每个切片的执行时长，那我们可以在一个定时的时间段内（比如16ms内）持续迭代执行。

```javascript
/**
 * 增强版时间切片
 * @author 欧怼怼
 * @param generator {*}
 * @return {(function(): void)|*}
 */
function timeSlicing(generator) {
  if (typeof generator === 'function') generator = generator();

  if (!generator || typeof generator.next !== 'function') return;

  return function next() {
    // 获取开始执行的毫秒级时间戳
    const start = performance.now();
    let res = null;
    // 16ms内持续迭代执行
    do {
      res = generator.next();
    } while (!res.done && performance.now() - start < 16);

    if (res.done) return;
    // next会在下一个宏任务执行
    setTimeout(next);
  };
}
```

我们可以通过一个demo测试一下1秒内两种方法的执行次数。

```javascript
timeSlicing(function* () {
  let times = 0;
  const start = performance.now();
  while (performance.now() - start < 1000) {
    times++;
    yield;
  }

  // 简单版在一秒运行了765次
  // 增强版在一秒运行了1497503次
  console.log(times);
})();
```
