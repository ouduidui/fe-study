/**
 * for + splice
 * @param arr {*[]}
 * @return {*[]}
 */
function unique1(arr) {
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

/**
 * indexOf | includes
 * @param arr {*[]}
 * @return {*[]}
 */
function unique2(arr) {
  const _arr = [];
  for (let i = 0; i < arr.length; i++) {
    // (_arr.indexOf(arr[i]) === -1) && _arr.push(arr[i]);
    (!_arr.includes(arr[i])) && _arr.push(arr[i]);
  }
  return _arr;
}

/**
 * filter + indexOf
 * @param arr {*[]}
 * @return {*}
 */
function unique3(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

/**
 * reduce + includes
 * @param arr {*[]}
 * @return {*}
 */
function unique4(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);
}

/**
 * Set
 * @param arr {*[]}
 * @return {*}
 */
function unique5(arr) {
  return [...new Set(arr)];
}

module.exports = {
  unique1,
  unique2,
  unique3,
  unique4,
  unique5
}
