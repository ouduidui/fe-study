/**
 * filter + indexOf 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

module.exports = unique;
