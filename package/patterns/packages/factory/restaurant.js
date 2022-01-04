function restaurant(menu) {
  switch (menu) {
    case '汉堡包':
      return new Hamburger();
    case '薯条':
      return new Chips();
    case '鸡块':
      return new ChickenNuggets();
    default:
      throw new Error('本店没有此道菜')
  }
}

class Hamburger {
  constructor() {
    this.food = '汉堡包';
    // TODO 开始制作...
  }
}

class Chips {
  constructor() {
    this.food = '薯条';
    // TODO 开始制作...
  }
}

class ChickenNuggets {
  constructor() {
    this.food = '鸡块';
    // TODO 开始制作...
  }
}

module.exports = restaurant;
