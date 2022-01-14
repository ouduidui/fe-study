/**
 * indexOf | include 实现数组去重
 * @author OUDUIDUI
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  const _arr = [];
  for (let i = 0; i < arr.length; i++) {
    // (_arr.indexOf(arr[i]) === -1) && _arr.push(arr[i]);
    !_arr.includes(arr[i]) && _arr.push(arr[i]);
  }
  return _arr;
}

module.exports = unique;
