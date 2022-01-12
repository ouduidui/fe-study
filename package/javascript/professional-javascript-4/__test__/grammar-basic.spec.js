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
    });
  });
});
