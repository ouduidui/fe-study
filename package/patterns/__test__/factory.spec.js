const restaurant = require('../packages/factory/restaurant');
const Restaurant = require('../packages/factory/refactorRestaurant');
const Factory = require('../packages/factory/factory');

describe('工厂模式', () => {
  it('简单实现餐厅点菜', () => {
    const food1 = restaurant('汉堡包');
    expect(food1.food).toBe('汉堡包');
    const food2 = restaurant('薯条');
    expect(food2.food).toBe('薯条');
    const food3 = restaurant('鸡块');
    expect(food3.food).toBe('鸡块');
    expect(() => restaurant('蛋挞')).toThrowError('本店没有此道菜');
  });

  it('重构餐厅点菜', () => {
    const restaurant = new Restaurant();
    const food1 = restaurant.getMenu('汉堡包');
    expect(food1.food).toBe('汉堡包');

    expect(() => restaurant.getMenu('薯条')).toThrowError('本店没有此道菜');
    restaurant.addMenu('薯条', {});
    const food2 = restaurant.getMenu('薯条');
    expect(food2.food).toBe('薯条');
    expect(() => restaurant.addMenu('汉堡包', {})).toThrowError('已经有这道菜了');

    restaurant.removeMenu('汉堡包');
    expect(() => restaurant.getMenu('汉堡包')).toThrowError('本店没有此道菜');
  });

  it('通用实现', () => {
    const product1 = Factory.getInstance('Product1');
    expect(product1.type).toBe('Product1');
    const product2 = Factory.getInstance('Product2');
    expect(product2.type).toBe('Product2');
    expect(() => Factory.getInstance('Product3')).toThrowError('当前没有这个产品');
  });
});
