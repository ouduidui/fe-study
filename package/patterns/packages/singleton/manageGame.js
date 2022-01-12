function ManageGame() {
  if (!ManageGame._instance) {
    // 如果 _instance 静态属性没有示例的话，将实例赋值于它
    ManageGame._instance = this;
  }
  // 返回实例
  return ManageGame._instance;
}

// 定义 getInstance 静态方法，用于获取实例
ManageGame.getInstance = function () {
  if (ManageGame._instance) {
    return ManageGame._instance;
  }
  return (ManageGame._instance = new ManageGame());
};

module.exports = ManageGame;
