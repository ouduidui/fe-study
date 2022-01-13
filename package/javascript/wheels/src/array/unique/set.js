/**
 * Set
 * @param arr {*[]}
 * @return {*}
 */
function unique(arr) {
  return [...new Set(arr)];
}

module.exports = unique;
