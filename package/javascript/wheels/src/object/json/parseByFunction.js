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

module.exports = parse;
