/**
 * 使用栈实现简易版扁平化
 * @author OUDUIDUI
 * @param array {*[]}
 * @returns {*[]}
 */
const flat = function (array) {
  const stack = [...array];
  const result = [];

  while (stack.length > 0) {
    // 弹出最后一个值
    const val = stack.pop();
    if (Array.isArray(val)) {
      // 如果是数组的话解体再入栈
      stack.push(...val);
    } else {
      // 往数组前面推入
      result.unshift(val);
    }
  }

  return result;
};

module.exports = flat;
