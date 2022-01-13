/**
 * for + splice
 * @param arr {*[]}
 * @return {*[]}
 */
function unique(arr) {
  const _arr = [...arr];
  for (let i = 0; i < _arr.length; i++) {
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[i] === _arr[j]) {
        _arr.splice(j, 1);
        j--;
      }
    }
  }
  return _arr;
}

module.exports = unique;
