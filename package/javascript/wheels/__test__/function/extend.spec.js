const extend = require('../../src/function/extend/index');

describe('继承', () => {
  function Colors(color) {
    this.colors = ['red', 'blue'];
    if (color) {
      this.colors.push(color);
    }
  }

  Colors.prototype.getColors = function () {
    return this.colors;
  };

  it('原型链继承', () => {
    function Colors1() {}
    Colors1.prototype = new Colors();

    // 缺点一：子类在实例化的时候无法给父类构造函数传参
    let c1 = new Colors1('yellow');
    expect(c1.getColors()).toStrictEqual(['red', 'blue']);
    c1.colors.push('yellow');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow']);

    // 缺点二：子类原型包含的引用类型属性将被所有实例共享
    let c2 = new Colors1();
    expect(c2.getColors()).toStrictEqual(['red', 'blue', 'yellow']);
  });

  it('借用构造函数实现继承', () => {
    function Colors1(color) {
      Colors.call(this, color);
    }

    // 解决了原型链继承无法传参问题
    let c1 = new Colors1('yellow');
    expect(c1.colors).toStrictEqual(['red', 'blue', 'yellow']);
    c1.colors.push('black');
    expect(c1.colors).toStrictEqual(['red', 'blue', 'yellow', 'black']);

    // 解决了原型链继承子类原型包含的引用类型对实例共享问题
    let c2 = new Colors1(undefined);
    expect(c2.colors).toStrictEqual(['red', 'blue']);

    // 缺点一：它继承不了原型链上的方法
    expect(c1.getColors).toBe(undefined);
  });

  it('组合继承', () => {
    function Colors1(color) {
      Colors.call(this, color);
    }

    // 缺点一：需要执行两次父类构造函数
    Colors1.prototype = new Colors();
    Colors1.prototype.construct = Colors1;

    let c1 = new Colors1('yellow');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow']);
    c1.colors.push('black');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow', 'black']);

    let c2 = new Colors1(undefined);
    expect(c2.getColors()).toStrictEqual(['red', 'blue']);
  });

  it('寄生式组合继承', () => {
    function Colors1(color) {
      Colors.call(this, color);
    }

    Colors1.prototype = Object.create(Colors.prototype);
    Colors1.prototype.construct = Colors1;

    let c1 = new Colors1('yellow');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow']);
    c1.colors.push('black');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow', 'black']);

    let c2 = new Colors1(undefined);
    expect(c2.getColors()).toStrictEqual(['red', 'blue']);
  });

  it('寄生式组合继承 - 封装', () => {
    function Colors1(color) {
      Colors.call(this, color);
    }

    extend(Colors1, Colors);

    let c1 = new Colors1('yellow');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow']);
    c1.colors.push('black');
    expect(c1.getColors()).toStrictEqual(['red', 'blue', 'yellow', 'black']);

    let c2 = new Colors1(undefined);
    expect(c2.getColors()).toStrictEqual(['red', 'blue']);
  });
});
