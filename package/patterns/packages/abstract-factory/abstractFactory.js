// 工厂抽象类
class AbstractFactory {
  constructor() {
    if(new.target === AbstractFactory) {
      throw new Error('抽象类不能直接实例化!')
    }
  }

  // 抽象方法
  createProduct() {
    throw new Error('抽象方法不能调用!')
  }
}

// 具体工厂
class Factory extends AbstractFactory {
  constructor() {
    super();
  }

  createProduct(type) {
    switch (type) {
      case 'Product1':
        return new Product1();
      case 'Product2':
        return new Product2();
      default:
        throw new Error('当前没有这个产品')
    }
  }
}

// 抽象产品类
class AbstractProduct {
  constructor() {
    if(new.target === AbstractFactory) {
      throw new Error('抽象类不能直接实例化!')
    }
  }

  // 抽象方法
  operate() {
    throw new Error('抽象方法不能调用!')
  }
}

// 具体产品
class Product1 extends AbstractProduct {
  constructor() {
    super();
    this.type = 'Product1';
  }

  operate() {
    return this.type;
  }
}

// 具体产品
class Product2 extends AbstractProduct {
  constructor() {
    super();
    this.type = 'Product2';
  }

  operate() {
    return this.type;
  }
}


module.exports = Factory
