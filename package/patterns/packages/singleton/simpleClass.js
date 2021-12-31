class Singleton {
  // 声明静态属性 _instance 用于存储示例
  static _instance = null;

  constructor() {
    if(!Singleton._instance) {
      // 初始化示例
      Singleton._instance = this;
    }

    // 返回实例
    return Singleton._instance;
  }

  // 定义 getInstance 静态方法，用于获取实例
  static getInstance() {
    if(!Singleton._instance) {
      // 初始化示例
      Singleton._instance = this;
    }

    return Singleton._instance;
  }
}

module.exports = Singleton;
