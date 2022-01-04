class Restaurant {
  constructor() {
    this.menu = [
      {food: '汉堡包', method/* 做菜方法 */: {}}
    ]
  }

  // 点菜
  getMenu(food) {
    const foodInfo = this.menu.find(item => item.food === food);
    if(!foodInfo) throw new Error('本店没有此道菜')

    return new Cooking(food, foodInfo.method);
  }

  // 增加菜品
  addMenu(food, method) {
    const foodInfo = this.menu.find(item => item.food === food);
    if(foodInfo) throw new Error('已经有这道菜了');
    this.menu.push({food, method})
  }

  // 删除菜品
  removeMenu(foo) {
    this.menu = this.menu.filter(item => item.food !== foo);
  }
}

// 做菜
class Cooking {
  constructor(food, method) {
    // TODO 开始制作...
    this.food = food;
  }
}

module.exports = Restaurant;
