/**
 * 实现数组原型方法 filter
 * @author OUDUIDUI
 * @param callback {(currentValue: *, index?: number, array?: *[]) => boolean}
 * @param thisArg {object | undefined}
 * @returns {*[]}
 */
const _filter = function (callback, thisArg) {
  // 判断this不等于null
  if (this === null) {
    throw new TypeError('this is null or not defined');
  }

  // 判断callback是不是一个函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const len = arr.length;

  const newArr = [];
  let index = 0;

  // 遍历数组
  while (index < len) {
    // 如果通过回调函数的测试，则添加到newArr
    if (callback.call(thisArg, arr[index], index, arr)) {
      newArr.push(arr[index]);
    }
    index++;
  }

  // 返回新数组
  return newArr;
};

module.exports = _filter;
