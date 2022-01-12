const { AbstractClass1, AbstractClass2 } = require('../packages/abstract-factory/simple');
const { Restaurant, Dish } = require('../packages/abstract-factory/dish');
const Restaurant2 = require('../packages/abstract-factory/restaurant');
const Factory = require('../packages/abstract-factory/abstractFactory');

describe('抽象工厂模式', () => {
  it('抽象类不能直接实例化', () => {
    expect(() => new AbstractClass1()).toThrowError('抽象类不能直接实例化');
    expect(() => new AbstractClass2()).toThrowError('抽象类不能直接实例化');
  });

  it('实现餐厅菜品抽象类', () => {
    expect(() => new Dish()).toThrowError('抽象类不能直接实例化');

    const food1 = Restaurant.orderDish('汉堡包');
    expect(food1.eat()).toBe('汉堡包');
    const food2 = Restaurant.orderDish('薯条');
    expect(food2.eat()).toBe('薯条');
  });

  it('将餐厅抽象化', () => {
    const restaurant = new Restaurant2();
    const food1 = restaurant.createDish('汉堡包');
    expect(food1.eat()).toBe('汉堡包');
    const food2 = restaurant.createDish('薯条');
    expect(food2.eat()).toBe('薯条');
  });

  it('通用实现', () => {
    const factory = new Factory();
    const product1 = factory.createProduct('Product1');
    expect(product1.operate()).toBe('Product1');
    const product2 = factory.createProduct('Product2');
    expect(product2.operate()).toBe('Product2');
  });
});
