/**
 * 实现 Object.is 方法
 * @author 欧怼怼
 * @param value1 {*}
 * @param value2 {*}
 * @return {boolean}
 */
function is(value1, value2) {
  if (value1 === value2) {
    // 此时只需要识别 +0 和 -0 的情况
    // 通过 1 / +0 = Infinity 和 1 / -0 = -Infinity 的原则来识别
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }

  // 此时需要识别 NaN
  // 通过 NaN !== NaN 来识别
  return value1 !== value1 && value2 !== value2;
}

module.exports = is;
