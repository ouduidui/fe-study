const throttleByTimestamp = require('../../src/function/throttle/timestamp');
const throttleByTimer = require('../../src/function/throttle/timer');
const complexThrottle = require('../../src/function/throttle/complex');

describe('节流', () => {
  it('时间戳实现', (done) => {
    const fn = jest.fn();
    console.warn = jest.fn();

    const throttle = throttleByTimestamp(fn, 2000);
    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  it('定时器实现', (done) => {
    const fn = jest.fn();
    console.warn = jest.fn();

    const throttle = throttleByTimer(fn, 2000);
    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  it('复杂版', (done) => {
    const fn = jest.fn(function () {
      expect(this.test).toBe('test');
    });

    const throttle = complexThrottle(fn, 2000, {
      context: { test: 'test' }
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  it('复杂版 - 不立即执行', (done) => {
    const fn = jest.fn();

    const throttle = complexThrottle(fn, 2000, {
      leading: false
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });

  it('复杂版 - 最后额外触发一次', (done) => {
    const fn = jest.fn();

    const throttle = complexThrottle(fn, 2000, {
      trailing: true
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    throttle();

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  it('复杂版 - 不立即执行但最后额外触发一次', (done) => {
    const fn = jest.fn();

    const throttle = complexThrottle(fn, 2000, {
      leading: false,
      trailing: true
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });

  it('复杂版 - 取消执行', (done) => {
    const fn = jest.fn();

    const throttle = complexThrottle(fn, 2000, {
      trailing: true
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    throttle();
    throttle.cancel();

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });
});
