// 工厂类
class Factory {
  static getInstance(type) {
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

class Product1 {
  constructor() {
    this.type = 'Product1'
  }
}

class Product2 {
  constructor() {
    this.type = 'Product2'
  }
}

module.exports = Factory;
