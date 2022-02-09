/**
 * 实现字符串原型方法 slice
 * @author 欧怼怼
 * @param beginIndex {number}
 * @param [endIndex] {number}
 * @return {string}
 */
function slice(beginIndex, endIndex) {
  const str = this;
  // 处理 beginIndex 小于零情况
  beginIndex = beginIndex < 0 ? str.length + beginIndex : beginIndex;
  // 处理 endIndex 为没有传的情况
  endIndex =
    endIndex === undefined
      ? str.length
      : endIndex < 0 /* 判断 endIndex 是不是小于0 */
      ? str.length + endIndex
      : endIndex;

  // 当 beginIndex 大于等于 endIndex 时，则返回空字符串
  if (beginIndex >= endIndex) return '';

  let result = '';
  // 遍历拼接结果
  for (let i = beginIndex; i < endIndex; i++) {
    result += str[i];
  }

  return result;
}

module.exports = slice;
