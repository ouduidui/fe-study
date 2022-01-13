/**
 * filter + indexOf
 * @param arr {*[]}
 * @return {*}
 */
function unique(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

module.exports = unique;
