# 实现util.promisify

## 思路

> [util.promisify(original) | Node.js API 文档](http://nodejs.cn/api/util/util_promisify_original.html)

该方法是Node工具库的一个方法，它是用于将采用遵循常见的错误优先的回调风格的函数（也就是将 `(err, value) => ...` 回调作为最后一个参数），封装成一个Promise风格的函数。



我们可以通过下面的例子了解一下：

```javascript
// 正常使用 fs.readFile
fs.readFile('./data.json', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});


// 使用promisify
const readFile = promisify(fs.readFile);
readFile('./data.json')
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
```

接下来我们来实现一下。

## 实现

```javascript
/**
 * 实现promisify
 * @author 欧怼怼
 * @param original {function(...[*]=): *}
 * @return {function(...[*]=): Promise<unknown>}
 */
function promisify(original) {
  // 返回一个函数
  return function (...args) {
    // 函数返回一个promise
    return new Promise((resolve, reject) => {
      // 调用函数
      original.call(
        this,
        ...args,
        // 添加回调函数
        (err, data) => {
          err ? reject(err) : resolve(data);
        }
      );
    });
  };
}
```