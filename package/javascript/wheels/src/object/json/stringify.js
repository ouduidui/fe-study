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
