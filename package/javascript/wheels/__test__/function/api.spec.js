const Function = require('../../src/function/api');

describe('函数原生方法', () => {
  describe('call', () => {
    it('无传入参数时，this为window', () => {
      function fn() {
        expect(this).toBe(window);
      }

      fn._call();
    });

    it('传入上下文', () => {
      function fn() {
        expect(this.msg).toBe('Hello World');
      }

      fn._call({ msg: 'Hello World' });
    });

    it('返回值', () => {
      function fn(msg) {
        return msg;
      }

      expect(fn._call(null, 'Hello World')).toBe('Hello World');
    });
  });

  describe('apply', () => {
    it('无传入参数时，this为window', () => {
      function fn() {
        expect(this).toBe(window);
      }

      fn._apply();
    });

    it('传入上下文', () => {
      function fn() {
        expect(this.msg).toBe('Hello World');
      }

      fn._apply({ msg: 'Hello World' });
    });

    it('返回值', () => {
      function fn(msg) {
        return msg;
      }

      expect(fn._apply(null, ['Hello World'])).toBe('Hello World');
    });
  });

  describe('bind', () => {
    it('不会立即调用，而生成新的函数', () => {
      const fn = jest.fn();
      const fn2 = function (arg1, arg2) {
        fn();
      };

      const newFn = fn2._bind();
      expect(fn).not.toHaveBeenCalled();
      newFn();
      expect(fn).toHaveBeenCalledTimes(1);

      expect(newFn.length).toBe(2);
      expect(newFn.name).toBe('bound fn2');
    });

    it('返回的新函数存在length属性和name属性', () => {
      const fn = function (arg1, arg2) {
        expect(arg1).toBe('arg1');
        expect(arg2).toBe('arg2');
        expect(this.test).toBe('test');
      };

      const newFn = fn._bind({ test: 'test' }, 'arg1');
      expect(newFn.length).toBe(1);
      expect(newFn.name).toBe('bound fn');
      newFn('arg2');
    });

    it('返回的新函数被new调用作为构造函数时，绑定的值会指向并改为`new`的指定对象', () => {
      const Fn = function () {};

      const context = {
        a: 1
      };
      const NewFn = Fn._bind(context);

      const f = new NewFn();
      expect(f.hasOwnProperty('a')).toBe(false);
    });

    it('绑定后的函数的`prototype`需要指向原函数的`prototype`', () => {
      const Fn = function () {};
      Fn.prototype.test = function () {
        return 'test';
      };

      const NewFn = Fn._bind();

      const f = new NewFn();
      expect(f.test()).toBe('test');
    });
  });
});
