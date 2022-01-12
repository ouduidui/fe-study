class Restaurant {
  static orderDish(type) {
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

// 抽象类
class Dish {
  constructor() {
    if (new.target === Dish) {
      throw new Error('抽象类不能直接实例化!');
    }
  }

  // 可以吃
  eat() {
    throw new Error('抽象方法不能调用!');
  }
}

class Hamburger extends Dish {
  constructor() {
    super();
    this.type = '汉堡包';
  }

  eat() {
    return this.type;
  }
}

class Chips extends Dish {
  constructor() {
    super();
    this.type = '薯条';
  }

  eat() {
    return this.type;
  }
}

module.exports = {
  Restaurant,
  Dish
};
