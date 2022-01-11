class ManageGame {
  // 声明静态属性 _instance 用于存储示例
  static _instance = null;

  constructor() {
    if(!ManageGame._instance) {
      // 初始化示例
      ManageGame._instance = this;
    }

    // 返回实例
    return ManageGame._instance;
  }

  // 定义 getInstance 静态方法，用于获取实例
  static getInstance() {
    if(!ManageGame._instance) {
      // 初始化示例
      ManageGame._instance = this;
    }

    return ManageGame._instance;
  }
}

module.exports = ManageGame;
