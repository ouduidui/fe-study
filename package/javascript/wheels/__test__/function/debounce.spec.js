const { debounce1, debounce2 } = require('../../src/function/debounce');

describe('防抖', () => {
  it('简易版', (done) => {
    const fn = jest.fn(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    });

    const debounce = debounce1(fn, 1000);

    for (let i = 0; i < 10000; i++) {
      debounce();
      expect(fn).not.toHaveBeenCalled();
    }
  });

  it('复杂版', (done) => {
    const fn = jest.fn(function () {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(this.test).toBe('test');
      done();
    });

    const debounce = debounce2(fn, 1000, {
      context: { test: 'test' }
    });

    for (let i = 0; i < 10000; i++) {
      debounce();
      expect(fn).not.toHaveBeenCalled();
    }
  });

  it('复杂版 - 立即执行', () => {
    const fn = jest.fn();

    const debounce = debounce2(fn, 1000, {
      leading: true
    });

    for (let i = 0; i < 10000; i++) {
      debounce();
      expect(fn).toHaveBeenCalledTimes(1);
    }
  });

  it('复杂版 - 终止', (done) => {
    const fn = jest.fn();

    const debounce = debounce2(fn, 1000);

    for (let i = 0; i < 10000; i++) {
      debounce();
      expect(fn).not.toHaveBeenCalled();
    }
    debounce.cancel();

    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled();
      done();
    }, 2000);
  });
});
