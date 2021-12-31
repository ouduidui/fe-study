class FuncClass {}

// 饿汉式
const HungrySingleton = (function () {
  // 自调用时就初始化
  const _instance = new FuncClass()

  return function () {
    return _instance
  }
})()

// 懒汉式
const LazySingleton = (function () {
  let _instance = null

  return function () {
    // 当真正使用时再初始化
    return _instance || (_instance = new FuncClass())
  }
})()

module.exports = {
  HungrySingleton,
  LazySingleton
}
