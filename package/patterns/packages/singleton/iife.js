// 使用自调用匿名函数方式声明
const Singleton = (function () {
  // 用于存储示例
  let _instance = null;

  // 真正的 Singleton 构造函数
  const _Singleton = function (name) {
    if (!_instance) {
      _instance = this;
      this.name = name;
    }
    return _instance;
  }

  // 定义 getInstance 静态方法，用于获取实例
  _Singleton.getInstance = function (name) {
    if (!_instance) {
      _instance = new _Singleton(name);
    }
    return _instance;
  }

  // 返回构造函数
  return _Singleton;
})()

module.exports = Singleton;
