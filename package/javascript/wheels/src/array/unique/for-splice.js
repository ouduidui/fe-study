/**
 * for + splice 实现数组去重
 * @author 欧怼怼
 * @param arr {*[]}
 * @returns {*[]}
 */
function unique(arr) {
  const _arr = [...arr];
  for (let i = 0; i < _arr.length; i++) {
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[i] === _arr[j]) {
        _arr.splice(j, 1);
        j--; // 此时已经删除一个元素，记得 j - 1
      }
    }
  }
  return _arr;
}

module.exports = unique;
