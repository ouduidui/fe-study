function Singleton() {
  if (!Singleton._instance) {
    // 如果 _instance 静态属性没有示例的话，将实例赋值于它
    Singleton._instance = this
  }
  // 返回实例
  return Singleton._instance
}

// 定义 getInstance 静态方法，用于获取实例
Singleton.getInstance = function () {
  if (Singleton._instance) {
    return Singleton._instance
  }
  return Singleton._instance = new Singleton()
}

module.exports = Singleton;


