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
    it('生成新的函数', () => {
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

    it('传参', () => {
      const fn = function (arg1, arg2) {
        expect(arg1).toBe('arg1');
        expect(arg2).toBe('arg2');
        expect(this.test).toBe('test');
      };

      const newFn = fn._bind({ test: 'test' }, 'arg1');
      expect(newFn.length).toBe(1);
      newFn('arg2');
    });

    it('继承', () => {
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
