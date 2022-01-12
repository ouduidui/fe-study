const benzDirector = require('../packages/builder/carBuilder');
const benzDirectorByClass = require('../packages/builder/carBuilderClass');
const Director = require('../packages/builder/builder');
const {CarBuilder1, CarBuilder2, CarBuilder3} = require('../packages/builder/multipleParameters')

describe('建造者模式', () => {
  it('示例的代码实现', () => {
    const benzCar = benzDirector('small', 'big', {color:'black', weight: '1600kg'});
    expect(benzCar.color).toBe('black');
    expect(benzCar.weight).toBe('1600kg');
    expect(benzCar.tyreType).toBe('小号轮胎');
    expect(benzCar.engineType).toBe('大马力发动机');
  })

  it('示例的代码实现 - 使用class实现', () => {
    const benzCar = benzDirectorByClass('small', 'big', {color:'black', weight: '1600kg'});
    expect(benzCar.color).toBe('black');
    expect(benzCar.weight).toBe('1600kg');
    expect(benzCar.tyreType).toBe('小号轮胎');
    expect(benzCar.engineType).toBe('大马力发动机');
  })

  it('通用实现', () => {
    const product = new Director({name: 'product'});
    expect(product.params.name).toBe('product');
    expect(product.part1).toBe('part1');
    expect(product.part2).toBe('part2');
  })

  it('重构具有多参数的构造函数', () => {
    const benz1 = new CarBuilder1('大马力发动机', '2ton', '2000mm','white', '大号轮胎', '奔驰', 'AMG');
    const benz2 = new CarBuilder2()
      .setCarProperty('engine', '大马力发动机')
      .setCarProperty('weight', '2ton')
      .setCarProperty('height', '2000mm')
      .setCarProperty('color', 'white')
      .setCarProperty('tyre', '大号轮胎')
      .setCarProperty('name', '奔驰')
      .setCarProperty('type', 'AMG');
    const benz3 = new CarBuilder3()
      .setEngine('大马力发动机')
      .setWeight('2ton')
      .setHeight('2000mm')
      .setColor('white')
      .setTyre('大号轮胎')
      .setName('奔驰')
      .setType('AMG');

    expect(benz1.engine).toBe('大马力发动机');
    expect(benz1.weight).toBe('2ton');
    expect(benz1.height).toBe('2000mm');
    expect(benz1.color).toBe('white');
    expect(benz1.tyre).toBe('大号轮胎');
    expect(benz1.name).toBe('奔驰');
    expect(benz1.type).toBe('AMG');
    expect(benz2.engine).toBe('大马力发动机');
    expect(benz2.weight).toBe('2ton');
    expect(benz2.height).toBe('2000mm');
    expect(benz2.color).toBe('white');
    expect(benz2.tyre).toBe('大号轮胎');
    expect(benz2.name).toBe('奔驰');
    expect(benz2.type).toBe('AMG');
    expect(benz3.engine).toBe('大马力发动机');
    expect(benz3.weight).toBe('2ton');
    expect(benz3.height).toBe('2000mm');
    expect(benz3.color).toBe('white');
    expect(benz3.tyre).toBe('大号轮胎');
    expect(benz3.name).toBe('奔驰');
    expect(benz3.type).toBe('AMG');
  })
})
