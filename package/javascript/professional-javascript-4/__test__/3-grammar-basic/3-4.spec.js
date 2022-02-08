describe('3.4 数据类型', () => {
  it('七种数据类型', function () {
    // 六种原始类型 undefined null boolean number string symbol
    expect(typeof undefined).toBe('undefined');
    expect(typeof null).toBe('object'); // null实际上是空指针
    expect(typeof true).toBe('boolean');
    expect(typeof 1).toBe('number');
    expect(typeof 'a').toBe('string');
    expect(typeof Symbol('foo')).toBe('symbol');

    // 一种复杂数据类型 object
    expect(typeof {}).toBe('object');
    expect(typeof []).toBe('object');
    expect(typeof (() => {})).toBe('function'); // function实质上也是一种特殊的对象

    // ES2020新类型 BigInt
    expect(typeof 10n).toBe('bigint');
  });

  describe('undefined', () => {
    it('默认情况下，任何未经初始化的变量都会取得undefined', () => {
      let msg;
      expect(msg).toBe(undefined);
      expect(typeof msg).toBe('undefined');
    });

    it('undefined 是一个假值', () => {
      let msg;
      expect(!!msg).toBe(false);

      const fn = jest.fn();
      if (msg) {
        fn();
      }
      expect(fn).not.toHaveBeenCalled();

      if (!msg) {
        fn();
      }
      expect(fn).toBeCalledTimes(1);
    });
  });

  describe('null', () => {
    it('逻辑上讲，null值表示一个空对象指针', () => {
      let msg = null;
      expect(typeof msg).toBe('object');
    });

    it('在定义将要来保存对象值的变量时，建议使用null来初始化', () => {
      let msg1 = null;
      let msg2 = {};
      const fn = jest.fn();
      if (msg1) {
        fn();
      }
      expect(fn).not.toBeCalled();
      if (msg2) {
        fn();
      }
      expect(fn).toBeCalledTimes(1);
    });

    it('undefined值是由null值派生而来', () => {
      expect(undefined == null).toBe(true);
      expect(undefined === null).toBe(false);
    });
  });

  describe('boolean', () => {
    it('要将一个其他类型的值转换为布尔值，可以调用特定的Boolean()转换函数', () => {
      // 字符串
      // 非空字符串 -> true
      expect(Boolean('abc')).toBe(true);
      // 空字符串 -> false
      expect(Boolean('')).toBe(false);

      // 数值
      // 非零数值（包括无穷值） -> true
      expect(Boolean(1)).toBe(true);
      expect(Boolean(-1)).toBe(true);
      expect(Boolean(Infinity)).toBe(true);
      expect(Boolean(-Infinity)).toBe(true);
      // 0\NaN  -> false
      expect(Boolean(0)).toBe(false);
      expect(Boolean(NaN)).toBe(false);

      // 对象
      // 任意对象 -> true
      expect(Boolean({})).toBe(true);
      expect(Boolean({ a: 1 })).toBe(true);
      expect(Boolean([])).toBe(true);
      expect(Boolean([1, 2, 3])).toBe(true);
      expect(Boolean(() => {})).toBe(true);
      // null -> false
      expect(Boolean(null)).toBe(false);

      // undefined -> false
      expect(Boolean(undefined)).toBe(false);
    });
  });

  describe('number', () => {
    it('Number类型使用IEEE 754格式表示整数和浮点数（双精度值）', () => {
      // 也是因为这个特性，才会导致 0.1 + 0.2 !== 0.3
      expect(0.1 + 0.2).not.toBe(0.3);
      // 因为浮动数转为双精度值，大部分都是需要被四舍五入，因此实际上存入的值跟原始值不同
      expect(0.1).toBe(0.100000000000000005551115123126);
    });

    it('十进制、八进制、十六进制', () => {
      expect(55).toBe(55); // 十进制
      expect(0o70).toBe(56); // 八进制  0o + number
      expect(0x1f).toBe(31); // 十六进制  0x + number
    });

    describe('浮点数', () => {
      it('因为存储浮点数值使用的内存空间是存储整数值的两倍，所以小数点后没有数字的情况下，数值就会变成整数', () => {
        expect(1).toBe(1);
        expect(10.0).toBe(10);
      });

      it('科学计数法', () => {
        expect(3.125e7).toBe(31250000);
        expect(3e-7).toBe(0.0000003);
      });
    });

    it('值的范围', () => {
      expect(Number.MAX_VALUE).toBe(1.7976931348623157e308);
      expect(Number.MIN_VALUE).toBe(5e-324);
      expect(Number.MAX_SAFE_INTEGER).toBe(2 ** 53 - 1);
      expect(Number.MIN_SAFE_INTEGER).toBe(-1 * (2 ** 53 - 1));
      expect(Number.MAX_VALUE * 2).toBe(Infinity); // 无穷大
      expect(-1 * Number.MAX_VALUE * 2).toBe(-Infinity); // 负无穷大
      expect(Number.POSITIVE_INFINITY).toBe(Infinity);
      expect(Number.NEGATIVE_INFINITY).toBe(-Infinity);
    });

    describe('NaN', () => {
      it('NaN用于表达本来要返回数值的操作失败了，而不是抛出错误', () => {
        expect(0 / 0).toBe(NaN);
        expect(-0 / +0).toBe(NaN);
      });

      it('NaN不等于包括NaN在内的任何值', () => {
        expect(NaN === NaN).toBe(false);
      });

      it('isNaN()接收一个参数，可以是任意数据类型，然后判断这个参数是否"不是数值"', () => {
        expect(isNaN(NaN)).toBe(true);
        expect(isNaN(10)).toBe(false);
        expect(isNaN('10')).toBe(false); // 可以转换为10
        expect(isNaN('blue')).toBe(true); // 不可以转换为数值
        expect(isNaN(true)).toBe(false); // 可以转换为 1
      });
    });

    describe('数值转换', () => {
      describe('Number()：可以用于任何数据类型', () => {
        it('布尔值', () => {
          expect(Number(true)).toBe(1); // true -> 1
          expect(Number(false)).toBe(0); // false -> 0
        });

        it('数值', () => {
          expect(Number(1)).toBe(1);
        });

        it('null', () => {
          expect(Number(null)).toBe(0); // null -> 0
        });

        it('undefined', () => {
          expect(Number(undefined)).toBe(NaN); // undefined -> NaN
        });

        it('字符串', () => {
          // 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值
          expect(Number('1')).toBe(1);
          expect(Number('+1')).toBe(1);
          expect(Number('-1')).toBe(-1);
          expect(Number('01')).toBe(1); // 会忽略前面的零
          expect(Number('3.125e7')).toBe(31250000); // 支持科学计数法

          // 如果字符串包含有效的浮点数，则会转换为相应的浮点数
          expect(Number('1.1')).toBe(1.1);
          expect(Number('.1')).toBe(0.1);
          expect(Number('00.1')).toBe(0.1); // 会忽略前面的零

          // 如果字符串包含有效的八进制或十六进制，则会转换为与该八进制或十六进制值对象的十进制整数值
          expect(Number('0xff')).toBe(255);
          expect(Number('0o17')).toBe(15);

          // 如果是空字符串，则返回0
          expect(Number('')).toBe(0);

          // 除此之外，则返回NaN
          expect(Number('a')).toBe(NaN);
          expect(Number('111a')).toBe(NaN);
          expect(Number('a111')).toBe(NaN);
          expect(Number('1a1')).toBe(NaN);
        });

        it('对象', () => {
          // 调用valueOf方法，并按照上述规则转换返回的值。如果转换结果为NaN，则调用toString()方法，再按照转换字符串的规则转换
          const obj = { a: 1 };
          let res1 = Number(obj.valueOf());
          isNaN(res1) && (res1 = Number(obj.toString()));
          expect(Number(obj)).toBe(res1);
          expect(Number(obj)).toBe(NaN);

          const arr = [1];
          let res2 = Number(arr.valueOf());
          isNaN(res2) && (res2 = Number(obj.toString()));
          expect(Number(arr)).toBe(res2);
          expect(Number(arr)).toBe(1);
        });
      });

      describe('parseInt()：只用于字符串转换，并且只能生成整数，不能生成浮点数', () => {
        it('从第一个字符开始寻找，直至第一个非数值字符或加减符号为止', () => {
          expect(parseInt('123')).toBe(123);
          expect(parseInt('123a')).toBe(123);
          expect(parseInt('12a3')).toBe(12);
          expect(parseInt('1a23')).toBe(1);
          expect(parseInt('3e7')).toBe(3); // 不支持科学计数法
          expect(parseInt('a123')).toBe(NaN);
          expect(parseInt('')).toBe(NaN);
        });

        it('遇到小数会转成整数', () => {
          expect(parseInt('1.1')).toBe(1);
          expect(parseInt('1.9')).toBe(1);
          expect(parseInt('0.1')).toBe(0);
          expect(parseInt('0.9')).toBe(0);
          expect(parseInt('0.111a')).toBe(0);
          expect(parseInt('3.125e7')).toBe(3); // 不支持科学计数法
        });

        it('支持非十进制转换', () => {
          // 十六进制
          expect(parseInt('0xA')).toBe(10);
          expect(parseInt('A', 16)).toBe(10);
          // 八进制
          expect(parseInt('17', 8)).toBe(15);
          // 二进制
          expect(parseInt('10', 2)).toBe(2);
        });
      });

      describe('parseFloat()：只用于字符串转换，可以生成整数，也可以生成浮点数', () => {
        it('从第一个字符开始检测，解析到第一个无效浮点数值字符为止', () => {
          expect(parseFloat('1234')).toBe(1234);
          expect(parseFloat('1234a')).toBe(1234);
          expect(parseFloat('12.34')).toBe(12.34);
          expect(parseFloat('012.34')).toBe(12.34);
          expect(parseFloat('.1234')).toBe(0.1234);
          expect(parseFloat('1.2.3.4')).toBe(1.2);
          expect(parseFloat('3.125e7')).toBe(31250000); // 支持科学计数法
        });
      });
    });
  });

  describe('string', () => {
    describe('转换为字符串', () => {
      it('toString()', () => {
        expect((11).toString()).toBe('11');
        expect(true.toString()).toBe('true');
        expect('abc'.toString()).toBe('abc');
        expect({ a: 1 }.toString()).toBe('[object Object]');

        // undefined和null没有toString方法
        expect(() => {
          undefined.toString();
        }).toThrowError(TypeError);
        expect(() => {
          null.toString();
        }).toThrowError(TypeError);

        // 对于字符串可以接收底数转进制
        expect((10).toString()).toBe('10');
        expect((10).toString(2)).toBe('1010');
        expect((10).toString(8)).toBe('12');
        expect((10).toString(10)).toBe('10');
        expect((10).toString(16)).toBe('a');
      });

      it('String()', () => {
        expect(String(10)).toBe('10');
        expect(String('a')).toBe('a');
        expect(String(true)).toBe('true');
        expect(String(undefined)).toBe('undefined');
        expect(String(null)).toBe('null');
        expect(String({})).toBe('[object Object]');
      });
    });

    describe('模板字面量', () => {
      it('模板字面量保留换行字符，可以跨行定义字符串', () => {
        const str1 = 'Hello\nWorld';
        const str2 = `Hello
World`;
        expect(str1).toBe(str2);

        const str3 = `
HelloWorld`;
        expect(str3[0]).toBe('\n');
      });

      it('支持字符串插值', () => {
        let person = 'OUDUIDUI';
        let sayHi = `Hello, ${person}`;
        expect(sayHi).toBe('Hello, OUDUIDUI');

        // 变量为非字符串类型会自动调用toString
        person = { toString: () => 'OUDUIDUI' };
        sayHi = `Hello, ${person}`;
        expect(sayHi).toBe('Hello, OUDUIDUI');

        // 在插槽中可以调用函数和方法
        person = (name) => name;
        sayHi = `Hello, ${person('OUDUIDUI')}`;
        expect(sayHi).toBe('Hello, OUDUIDUI');
      });

      it('标签函数', () => {
        const getSum = (a, b) => {
          return `${a} + ${b} = ${a + b}`;
        };
        expect(getSum(1, 2)).toBe('1 + 2 = 3');
      });
    });

    describe('原始字符串', () => {
      expect('\u00A9').toBe('©');
      expect(String.raw`\u00A9`).toBe('\\u00A9');
    });
  });

  describe('symbol', () => {
    it('符号示例是唯一、不可变的', function () {
      const s1 = Symbol('abc');
      const s2 = Symbol('abc');
      expect(s1).not.toBe(s2);
    });

    it('Symbol函数不能与new关键字一起作为构造函数使用', () => {
      expect(() => new Symbol()).toThrow(TypeError); // TypeError: Symbol is not a constructor
    });

    it('全局注册表', () => {
      const s1 = Symbol.for('foo');
      const s2 = Symbol.for('foo');
      expect(s1).toBe(s2);

      // 全局注册表定义的符号跟Symbol()定义的符号也并不等同
      const s3 = Symbol('foo');
      expect(s1).not.toBe(s3);
      expect(s2).not.toBe(s3);

      // 查询全局注册表
      expect(Symbol.keyFor(s1)).toBe('foo');
      expect(Symbol.keyFor(s2)).toBe('foo');
      expect(Symbol.keyFor(s3)).toBe(undefined);
    });

    it('凡是可以使用字符串或字符作为属性的地方，都可以使用符号', () => {
      const s1 = Symbol('foo');
      const obj = { [s1]: 'foo', baz: 'baz' };
      expect(obj[s1]).toBe('foo');

      const s2 = Symbol('bar');
      Object.defineProperty(obj, s2, { value: 'bar' });
      expect(obj[s2]).toBe('bar');

      // getOwnPropertyNames 返回常规属性数组
      expect(Object.getOwnPropertyNames(obj)).toStrictEqual(['baz']);
      // getOwnPropertySymbols 返回符号属性数组
      expect(Object.getOwnPropertySymbols(obj)).toStrictEqual([s1, s2]);
      // Object.getOwnPropertyDescriptors 返回包含常规和符号属性描述符的对象
      expect(Object.getOwnPropertyDescriptors(obj)).toStrictEqual({
        baz: { configurable: true, enumerable: true, value: 'baz', writable: true },
        [s1]: { configurable: true, enumerable: true, value: 'foo', writable: true },
        [s2]: { configurable: false, enumerable: false, value: 'bar', writable: false }
      });
      // Reflect.ownKeys 返回两种类型的键
      expect(Reflect.ownKeys(obj)).toStrictEqual(['baz', s1, s2]);
    });

    describe('常用内置符号', () => {
      it('Symbol.asyncIterator：一个方法，该方法返回对象默认的AsyncIterator，由for-await-of语句使用', (done) => {
        // 这个符号表示实现异步迭代器API的函数
        class Emitter {
          constructor(max) {
            this.max = max;
            this.asyncIdx = 0;
          }

          async *[Symbol.asyncIterator]() {
            while (this.asyncIdx < this.max) {
              yield new Promise((resolve) => resolve(this.asyncIdx++));
            }
          }
        }

        async function asyncCount() {
          let emitter = new Emitter(5);
          expect(typeof emitter[Symbol.asyncIterator]).toBe('function');

          let i = 0;

          for await (const x of emitter) {
            expect(x).toBe(i++);
            if (i === 5) {
              done();
            }
          }
        }

        asyncCount();
      });

      it('Symbol.hasInstance： 一个方法，该方法决定一个构造函数对象是否认可一个对象是它的实例，由instanceof操作符使用', () => {
        class Bar {}
        const a = new Bar();
        expect(a instanceof Bar).toBe(true);
        expect(Bar[Symbol.hasInstance](a)).toBe(true);

        class Baz extends Bar {
          static [Symbol.hasInstance]() {
            return false;
          }
        }
        const b = new Baz();
        expect(Bar[Symbol.hasInstance](b)).toBe(true);
        expect(Baz[Symbol.hasInstance](b)).toBe(false);
      });

      it('Symbol.isConcatSpreadable：一个布尔值，如果是true，则意味对象应该用Array.prototype.concat()打平其数组对象', () => {
        let arr1 = ['foo'];
        let arr2 = ['bar'];
        expect(arr1.concat(arr2)).toStrictEqual(['foo', 'bar']);
        arr2[Symbol.isConcatSpreadable] = false;
        expect(arr1.concat(arr2)).toStrictEqual(['foo', arr2]); // ['foo', ['bar']]

        let arrLikeObject = { length: 1, 0: 'baz' };
        expect(arrLikeObject[Symbol.isConcatSpreadable]).toBe(undefined);
        expect(arr1.concat(arrLikeObject)).toStrictEqual(['foo', arrLikeObject]); //  ['foo', {length: 1, 0: 'baz'}]
        arrLikeObject[Symbol.isConcatSpreadable] = true;
        expect(arr1.concat(arrLikeObject)).toStrictEqual(['foo', 'baz']);
      });

      it('Symbol.iterator：一个方法，该方法返回对象默认的迭代器', () => {
        class Emitter {
          constructor(max) {
            this.max = max;
            this.idx = 0;
          }

          *[Symbol.iterator]() {
            while (this.idx < this.max) {
              yield this.idx++;
            }
          }
        }

        const emitter = new Emitter(5);

        let expected = 0;
        for (const x of emitter) {
          expect(x).toBe(expected++);
        }
      });

      it('Symbol.match：一个正则表达式方法，该方法用正则表达式去匹配字符串。由String.prototype.match()方法使用', () => {
        expect('foobar'.match(/bar/)[0]).toBe('bar');

        class FooMatch {
          static [Symbol.match](target) {
            return target.includes('foo');
          }
        }
        expect('foobar'.match(FooMatch)).toBe(true);
        expect('barbaz'.match(FooMatch)).toBe(false);
      });

      it('Symbol.replace：一个正则表达式方法，该方法替换一个字符串匹配的子串。由String.prototype.replace()方法使用', () => {
        expect('foobarbaz'.replace(/bar/, 'qux')).toBe('fooquxbaz');

        class FooReplacer {
          static [Symbol.replace](target, replacement) {
            return target.split('foo').join(replacement);
          }
        }
        expect('barfoobaz'.replace(FooReplacer, 'qux')).toBe('barquxbaz');
      });

      it('Symbol.search：一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由String.prototype.search()方法使用', () => {
        expect('foobar'.search(/bar/)).toBe(3);

        class FooSearcher {
          static [Symbol.search](target) {
            return target.indexOf('foo');
          }
        }
        expect('foobar'.search(FooSearcher)).toBe(0);
      });

      it('Symbol.species：一个函数值，该函数作为创建派生对象的构建函数', () => {
        class Bar extends Array {}
        class Baz extends Array {
          // 常用于对内置类型实例方法的返回值暴露实例化派生对象
          // 用Symbol.species定义静态的获取器(get)方法，可以覆盖新创建的实例的原型定义
          static get [Symbol.species]() {
            return Array;
          }
        }
        let bar = new Bar();
        expect(bar instanceof Array).toBe(true);
        expect(bar instanceof Bar).toBe(true);
        bar = bar.concat(bar);
        expect(bar instanceof Array).toBe(true);
        expect(bar instanceof Bar).toBe(true);

        let baz = new Baz();
        expect(baz instanceof Array).toBe(true);
        expect(baz instanceof Baz).toBe(true);
        baz = baz.concat(baz);
        expect(baz instanceof Array).toBe(true);
        expect(baz instanceof Baz).toBe(false);
      });

      it('Symbol.split：一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由String.prototype.split()方法使用', () => {
        expect('foobarbaz'.split(/bar/)).toStrictEqual(['foo', 'baz']);

        class FooSplitter {
          static [Symbol.split](target) {
            return target.split('foo');
          }
        }
        expect('barfoobaz'.split(FooSplitter)).toStrictEqual(['bar', 'baz']);
      });

      it('Symbol.toPrimitive：一个方法，该方法将对象转换为相应的原始值。由ToPrimitive抽象操作使用', () => {
        class Foo {}
        let foo = new Foo();
        expect(3 + foo).toBe('3[object Object]');
        expect(3 - foo).toBe(NaN);
        expect(String(foo)).toBe('[object Object]');

        class Bar {
          constructor() {
            this[Symbol.toPrimitive] = function (hint) {
              switch (hint) {
                case 'number':
                  return 3;
                case 'string':
                  return 'string bar';
                case 'default':
                default:
                  return 'default bar';
              }
            };
          }
        }
        let bar = new Bar();
        expect(3 + bar).toBe('3default bar');
        expect(3 - bar).toBe(0);
        expect(String(bar)).toBe('string bar');
      });

      it('Symbol.toStringTag：一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法Object.prototype.toString()使用', () => {
        const s = new Set();
        expect(s.toString()).toBe('[object Set]');
        expect(s[Symbol.toStringTag]).toBe('Set');

        class Foo {}
        const foo = new Foo();
        expect(foo.toString()).toBe('[object Object]');
        expect(foo[Symbol.toStringTag]).toBe(undefined);

        class Bar {
          constructor() {
            this[Symbol.toStringTag] = 'Bar';
          }
        }
        const bar = new Bar();
        expect(bar.toString()).toBe('[object Bar]');
        expect(bar[Symbol.toStringTag]).toBe('Bar');
      });

      it('Symbol.unscopables：一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中排除', () => {
        // const o = { foo: 'bar' };
        //
        // with (o) {
        //   expect(foo).toBe('bar');
        // }
        //
        // o[Symbol.unscopables] = {
        //   foo: true
        // };
        //
        // with (o) {
        //   expect(() => foo).toThrowError(TypeError);
        // }
      });
    });
  });

  describe('object', () => {
    const obj = new Object();
    obj.a = 1;

    it('原型属性和方法', () => {
      // constructor 指向用于创建对象的函数
      expect(obj.constructor).toBe(Object);
      // hasOwnProperty 用于判断当前对象实例（不是原型）上是否存在给定的属性
      expect(obj.hasOwnProperty('a')).toBe(true);
      // isPrototypeOf 用于判断当前对象是否为另一个对象的原型
      expect(Object.prototype.isPrototypeOf(obj)).toBe(true);
      // propertyIsEnumerable 用于判断给定的属性是否可以使用
      expect(obj.propertyIsEnumerable('a')).toBe(true);
      // toLocaleString 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境
      expect(obj.toLocaleString()).toBe('[object Object]');
      // toString 返回对象的字符串表示
      expect(obj.toString()).toBe('[object Object]');
      // valueOf 返回对象对应的原始值
      expect(obj.valueOf()).toBe(obj);
    });
  });
});
