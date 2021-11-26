const {debounce1, debounce2} = require("../src/debounce");
const {throttle1, throttle2, throttle3} = require("../src/throttle");

describe('防抖', () => {
  it('简易版', (done) => {
    const fn = jest.fn(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done();
    })

    const debounce = debounce1(fn, 1000);

    for (let i = 0; i < 10000; i++) {
      debounce()
      expect(fn).not.toHaveBeenCalled();
    }
  })

  it('复杂版', (done) => {
    const fn = jest.fn(function () {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(this.test).toBe('test');
      done();
    })

    const debounce = debounce2(fn, 1000, {
      context: {test: 'test'}
    });

    for (let i = 0; i < 10000; i++) {
      debounce()
      expect(fn).not.toHaveBeenCalled();
    }
  })

  it('复杂版 - 立即执行', () => {
    const fn = jest.fn();

    const debounce = debounce2(fn, 1000, {
      leading: true
    });

    for (let i = 0; i < 10000; i++) {
      debounce()
      expect(fn).toHaveBeenCalledTimes(1);
    }
  })

  it('复杂版 - 终止', (done) => {
    const fn = jest.fn()

    const debounce = debounce2(fn, 1000);

    for (let i = 0; i < 10000; i++) {
      debounce();
      expect(fn).not.toHaveBeenCalled();
    }
    debounce.cancel();

    setTimeout(() => {
      expect(fn).not.toHaveBeenCalled();
      done()
    }, 2000)
  })
})

describe('节流', () => {
  it('时间戳实现', (done) => {
    const fn = jest.fn();
    console.warn = jest.fn();

    const throttle = throttle1(fn, 2000);
    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done()
    }, 2000)
  })

  it('定时器实现', (done) => {
    const fn = jest.fn();
    console.warn = jest.fn();

    const throttle = throttle2(fn, 2000);
    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done()
    }, 2000)
  })

  it('复杂版', (done) => {
    const fn = jest.fn(function () {
      expect(this.test).toBe('test');
    });

    const throttle = throttle3(fn, 2000, {
      context: {test: 'test'}
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(2);
      done()
    }, 2000)
  })

  it('复杂版 - 不立即执行', (done) => {
    const fn = jest.fn();

    const throttle = throttle3(fn, 2000, {
      leading: false
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      throttle();
      expect(fn).toHaveBeenCalledTimes(1);
      done()
    }, 2000)
  })

  it('复杂版 - 最后额外触发一次', (done) => {
    const fn = jest.fn();

    const throttle = throttle3(fn, 2000, {
      trailing: true
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    throttle();

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(2);
      done()
    }, 2000)
  })

  it('复杂版 - 取消执行', (done) => {
    const fn = jest.fn();

    const throttle = throttle3(fn, 2000, {
      trailing: true
    });

    throttle();
    expect(fn).toHaveBeenCalledTimes(1);
    throttle();
    throttle.cancel();

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
      done()
    }, 2000)
  })
})