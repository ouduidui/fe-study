# 实现JSON.stringify

## 思路

`JSON.stringify()` 方法将一个 JavaScript 对象或值转换为 JSON 字符串。

这里我们只接受一个`value`参数，原生方法还指出`replacer`参数和`space`参数，这里就不实现了。

然后它最后返回一个表示给定值的JSON字符串。

这里我们简单说一下转换规则：

- 基本数据类型：

  - `undefined`转换之后仍然是`undefined`；

  - `boolean`转换之后会变成字符串，比如`"true"`或`"false"`

  - `number`转换之后是字符串类型的数值，除了`NaN`、`Infinity`和`-Infinity`，它们转换后会返回字符串`"null"`

  - `symbol`转换之后是`undefined`

  - `string`转换之后仍是`string`

  - `null`转换之后是字符串`null`

- 函数类型：

  - 转换之后是`undefined`

- 如果是对象类型：

  - 如果是数组：

    - 如果属性出现`undefined`、任意函数或者`symbol`，都转换成字符串`"null"`

    - 如果是正则对象，则返回字符串`"{}"`

    - 如果是`Date`对象，返回`Date`的`toJSON`字符串值

  - 如果是普通对象：

    - 如果有`toJSON`方法，那么序列化`toJSON()`的返回值

    - 如果属性值是`undefined`、任何函数或者`symbol`，则会忽略跳过

    - 所有以`symbol`为键的键值对也都会完全忽略掉

## 实现

```javascript
/**
 * 实现 JSON.stringify 方法
 * @author 欧怼怼
 * @param value {*}
 * @return {string|undefined}
 */
function stringify(value) {
  // 获取类型
  const type = typeof value;

  // 如果不是对象
  if (type !== 'object') {
    let res = value;
    // 如果是NaN或者Infinity，返回null
    if (value !== value /* 用来识别NaN */ || value === Infinity || value === -Infinity) {
      res = null;
    }
    // 如果为function、undefined或者symbol，返回undefined
    else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      return undefined;
    }
    // 如果是字符串的话，加上双引号
    else if (type === 'string') {
      res = `"${value}"`;
    }
    // 最后调用String()返回，顺便处理了boolean
    return String(res);
  }

  // 下面就是处理对象

  // 如果是null，返回 'null'
  if (value === null) {
    return 'null';
  }
  // 如果有toJSON方法，直接调用获取json，然后在进行一次 stringify
  if (value.toJSON && typeof value.toJSON === 'function') {
    return stringify(value.toJSON());
  }
  // 处理对象
  if (value instanceof Array) {
    const result = value.map((cur) => {
      // undefined、function或symbol都返回'null'
      if (typeof cur === 'undefined' || typeof cur === 'function' || typeof cur === 'symbol') {
        return 'null';
      }

      // 其余类型再调用一次 stringify
      return stringify(cur);
    });
    // 使用 [] 拼接，并且将单引号全部换成双引号
    return `[${result}]`.replace(/'/g, '"');
  }

  // 处理普通对象 Map Set
  const result = Object.keys(value).reduce((acc, key) => {
    // key 非 symbol， 且值非 symbol、undefined、function，可以拼接处理
    if (
      typeof key !== 'symbol' &&
      value[key] !== undefined &&
      typeof value[key] !== 'function' &&
      typeof value[key] !== 'symbol'
    ) {
      acc.push(`"${key}":${stringify(value[key])}`);
    }
    return acc;
  }, []);
  // 使用 {} 拼接，并且将单引号全部换成双引号
  return `{${result}}`.replace(/'/g, '"');
}

module.exports = stringify;

```

# 实现JSON.parse

## 思路

`JSON.parse()` 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。

该函数接收一个`text`字符串参数，返回一个解析出来的对象。

## 实现

### eval 实现

我们可以直接使用`eval('(' + text + ')')`实现，但是如果学过`eval`的同学都知道`eval`不可乱用，因为会存在XSS漏洞，如果传入的`text`是一段可执行的代码，那就糟糕了。

因此我们通过一些正则来判断传入的`text`是不是一段对象字符串。

> 相关正则式实质上是在JSON之父 Douglas Crockford 实现的 ployfill 代码中找的，更多的解析可以去这里看看：[JSON.parse 三种实现方式 · Issue #115 · youngwind/blog · GitHub](https://github.com/youngwind/blog/issues/115#issue-300869613)

```javascript
/**
 * 使用 eval 实现 JSON.parse
 * @author 欧怼怼
 * @param text {string}
 * @return {*}
 */
function parse(text) {
  const rx_one = /^[\],:{}\s]*$/;
  const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  const rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  const rx_four = /(?:^|:|,)(?:\s*\[)+/g;

  if (
    /* 如果替换后剩余字符只剩下空格，"]"、","、":"、"{" 或 "}"的话，文本对于eval就是安全的 */
    rx_one.test(
      text
        .replace(rx_two, '@') /* 将所有的反斜杠'\'替换成'@' */
        .replace(rx_three, ']') /* 用']'字符替换所有简单值标记 */
        .replace(rx_four, '') /* 删除所有根据冒号或都好或以文本开头的'[' */
    )
  ) {
    return eval(`(${text})`);
  }
}

```

### new Function 实现

同样的，我们也挺用`new Function`来替代`eval`操作。

```javascript
/**
 * 使用 new Function 实现 JSON.parse
 * @author 欧怼怼
 * @param text {string}
 * @return {*}
 */
function parse(text) {
  const rx_one = /^[\],:{}\s]*$/;
  const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  const rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  const rx_four = /(?:^|:|,)(?:\s*\[)+/g;

  if (
    /* 如果替换后剩余字符只剩下空格，"]"、","、":"、"{" 或 "}"的话，文本对于eval就是安全的 */
    rx_one.test(
      text
        .replace(rx_two, '@') /* 将所有的反斜杠'\'替换成'@' */
        .replace(rx_three, ']') /* 用']'字符替换所有简单值标记 */
        .replace(rx_four, '') /* 删除所有根据冒号或都好或以文本开头的'[' */
    )
  ) {
    return new Function('return' + text)();
  }
}
```

