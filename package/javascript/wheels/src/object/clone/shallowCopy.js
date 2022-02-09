/**
 * 实现浅拷贝
 * @author 欧怼怼
 * @param obj {*}
 * @return {*}
 */
function shallowCopy(obj) {
  // 如果不是对象，直接返回
  if (typeof obj !== 'object' || obj === null) return obj;
  // 初始化对象
  let newObj = Array.isArray(obj) ? [] : {};
  // 遍历obj，一一插入新对象
  for (let key in obj) {
    obj.hasOwnProperty(key) && (newObj[key] = obj[key]);
  }

  return newObj;
}

module.exports = shallowCopy;
