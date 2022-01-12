class AbstractRestaurant {
  constructor() {
    if (new.target === AbstractRestaurant) {
      throw new Error('抽象类不能直接实例化!');
    }
    this.signBoard = '麦当劳';
  }

  // 抽象方法 做菜
  createDish() {
    throw new Error('抽象方法不能调用');
  }
}

// 菜 抽象类
class AbstractDish {
  constructor() {
    if (new.target === AbstractRestaurant) {
      throw new Error('抽象类不能直接实例化!');
    }
    this.kind = '菜品';
  }

  eat() {
    throw new Error('抽象方法不能调用');
  }
}

class Restaurant extends AbstractRestaurant {
  constructor() {
    super();
  }

  createDish(type) {
    switch (type) {
      case '汉堡包':
        return new Hamburger();
      case '薯条':
        return new Chips();
      default:
        throw new Error('本店没有此道菜');
    }
  }
}

class Hamburger extends AbstractDish {
  constructor() {
    super();
    this.type = '汉堡包';
  }

  eat() {
    return this.type;
  }
}

class Chips extends AbstractDish {
  constructor() {
    super();
    this.type = '薯条';
  }

  eat() {
    return this.type;
  }
}

module.exports = Restaurant;
