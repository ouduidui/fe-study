/**
 * 实现字符串原型方法 trim()
 * @author 欧怼怼
 * @return {string}
 */
function trim() {
  const str = this;
  // ^ -> 匹配输入的开始
  // $ -> 匹配输入的结束
  // \s -> 匹配一个空白字符，包括空格、制表符、换页符和换行符
  // A|B -> 匹配‘A’或者‘B’
  return str.replace(/^\s*|\s*$/g, '');
}

module.exports = trim;
