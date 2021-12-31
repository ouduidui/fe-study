// 全局初始化 getInstance 变量
let getInstance;

{
  // 用于存储示例
  let _instance = null;

  // 实现构造函数
  const Singleton = function (name) {
    if(!_instance) {
      _instance = this;
      this.name = name;
    }
    return _instance;
  }

  // 实现 getInstance 方法，并复制给全局变量
  getInstance = function (name) {
    if(!_instance) {
      _instance = new Singleton(name);
    }
    return _instance;
  }
}

module.exports = getInstance;
