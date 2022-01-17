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
      // 六种原始类型
      expect(typeof undefined).toBe('undefined');
      expect(typeof null).toBe('object'); // null实际上是空指针
      expect(typeof true).toBe('boolean');
      expect(typeof 1).toBe('number');
      expect(typeof 'a').toBe('string');
      expect(typeof Symbol('foo')).toBe('symbol');

      // 一种复杂数据类型
      expect(typeof {}).toBe('object');
      expect(typeof []).toBe('object');

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
  });
});
