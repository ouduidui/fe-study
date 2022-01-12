//  实现功能类
class DoSomething {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

// 对上面的功能类进行单例模式赋能
const Singleton = (function () {
  let _instance = null;
  const ProxySingleton = function (name) {
    if (!_instance) {
      _instance = new DoSomething(name);
    }
    return _instance;
  };

  ProxySingleton.getInstance = function () {
    if (!_instance) {
      _instance = new DoSomething(name);
    }
    return _instance;
  };

  return ProxySingleton;
})();

module.exports = Singleton;
