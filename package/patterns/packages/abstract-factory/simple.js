class AbstractClass1 {
  constructor() {
    // 使用 new.target 来判断 new 的类
    if (new.target === AbstractClass1) {
      throw new Error('抽象类不能直接实例化');
    }
  }

  operate() {
    throw new Error('抽象方法不能调用');
  }
}

const AbstractClass2 = function () {
  if (new.target === AbstractClass2) {
    throw new Error('抽象类不能直接实例化');
  }
};

AbstractClass2.prototype.operate = function () {
  throw new Error('抽象方法不能调用');
};

module.exports = {
  AbstractClass1,
  AbstractClass2
};
