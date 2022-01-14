/**
 * ES6 Set 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  return [...new Set(arr)];
}

module.exports = unique;
