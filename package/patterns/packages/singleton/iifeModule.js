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
  };

  return {
    // 只返回 getInstance 方法
    getInstance(name) {
      if (!_instance) {
        _instance = new _Singleton(name);
      }
      return _instance;
    }
  };
})();

module.exports = Singleton;
