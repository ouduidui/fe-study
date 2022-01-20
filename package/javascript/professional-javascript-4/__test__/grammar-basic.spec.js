describe('第三章 语言基础', () => {
  describe('3.3 变量', () => {
    describe('var关键字', () => {
      it('基本使用', () => {
        var message = 'hi';
        expect(message).toBe('hi');
        message = 'hello'; // 改变值
        expect(message).toBe('hello');
        message = 100; // 改变类型
        expect(message).toBe(100);
      });

      describe('var声明作用域', () => {
        it('函数作用域', () => {
          function test() {
            var message = 'hi'; // 局部变量
          }
          test();
          // 访问不到message
          expect(() => message).toThrow(ReferenceError); // Uncaught ReferenceError: message is not defined
        });

        it('省略var操作符，可以创建一个外部变量', () => {
          function test() {
            message = 'hi'; // 局部变量
          }
          test();
          // 访问不到message
          expect(message).toBe('hi');
        });
      });

      it('变量提升', () => {
        expect(message).toBe(undefined); // 变量声明提升
        var message = 'hi';
        expect(message).toBe('hi');
      });

      it('可以重复声明', () => {
        var message = 'hi';
        var message = 'hello';
        var message = 'hello world';
        expect(message).toBe('hello world');
      });
    });

    describe('let 声明', () => {
      it('块作用域', () => {
        if (true) {
          var message1 = 'hi';
          expect(message1).toBe('hi');
        }
        expect(message1).toBe('hi');

        if (true) {
          let message2 = 'hi';
          expect(message2).toBe('hi');
        }
        // 访问不到message2
        expect(() => message2).toThrow(ReferenceError); // Uncaught ReferenceError: message2 is not defined
      });

      it('暂时死区：不会变量提升', () => {
        expect(() => message).toThrow(ReferenceError); // ReferenceError: Cannot access 'message' before initialization
        let message = 'hi';
      });

      it('for循环中的let声明', (done) => {
        for (var i = 0; i < 5; i++) {}
        expect(i).toBe(5); // for循环中使用var关键字定义的迭代变量会渗透到循环体外部

        for (let j = 0; j < 5; j++) {}
        expect(() => j).toThrow(ReferenceError); //  Uncaught ReferenceError: j is not defined

        for (var k = 0; k < 5; k++) {
          setTimeout(() => {
            // 5 5 5 5 5
            expect(k).toBe(5);
          }, 0);
        }

        let index = 0;
        for (let l = 0; l < 5; l++) {
          setTimeout(() => {
            // 0 1 2 3 4
            expect(l).toBe(index++);
            if (index === 5) done();
          }, 0);
        }
      });
    });

    describe('const 声明', () => {
      it('尝试修改const声明的变量会导致运行错误', () => {
        const a = 'Hello';
        expect(() => (a = 'hi')).toThrow(TypeError); // Assignment to constant variable.
      });

      it('const 声明的限制只适用于它指向的变量的引用', () => {
        const obj = {};
        obj.a = 1;
        expect(obj).toStrictEqual({ a: 1 });
      });

      it('for循环', () => {
        expect(() => {
          for (const i = 0; i < 5; i++) {}
        }).toThrow(TypeError); // Assignment to constant variable.

        const temp = ['a', 'b'];
        let index = 0;
        for (const key in { a: 1, b: 2 }) {
          expect(key).toBe(temp[index++]);
        }

        index = 1;
        for (const value of [1, 2, 3, 4, 5]) {
          expect(value).toBe(index++);
        }
      });
    });
  });

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
  });
});
