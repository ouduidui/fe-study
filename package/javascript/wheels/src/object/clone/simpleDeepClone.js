/**
 * 实现简单版深拷贝
 * @author 欧怼怼
 * @param obj {*}
 * @return {*}
 */
function deepClone(obj) {
  // 如果不是对象，直接返回
  if (typeof obj !== 'object' || obj === null) return obj;
  // 初始化对象
  const newObj = Array.isArray(obj) ? [] : {};
  // 遍历obj，一一插入新对象
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果是对象的话，再调用一下deepClone进行一次深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

module.exports = deepClone;
