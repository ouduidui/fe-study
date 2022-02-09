/**
 * 实现 Object.assign 方法
 * @author 欧怼怼
 * @param target {object}
 * @param sources {object[]}
 * @return {object}
 */
function assign(target, ...sources) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  // 遍历sources
  for (const obj of sources) {
    if (obj === null) continue;

    // 遍历obj
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key];
      }
    }
  }

  return target;
}

module.exports = assign;
