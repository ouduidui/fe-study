/**
 * reduce + includes
 * @param arr {*[]}
 * @return {*}
 */
function unique(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);
}

module.exports = unique;
