const {
  SimpleSingleton,
  OpenSingleton,
  ProxySingleton,
  getSingle
} = require('../packages/singleton-pattern/index.js');

describe('单例模式', () => {
  it('简单的单例模式', () => {
    const a = SimpleSingleton.getInstance('sven1');
    const b = SimpleSingleton.getInstance('sven2');

    expect(a === b).toBe(true);
    expect(a.getName()).toBe('sven1');
    expect(b.getName()).toBe('sven1');
  })

  it('透明的单例模式', () => {
    const a = new OpenSingleton('sven1');
    const b = new OpenSingleton('sven2');

    expect(a === b).toBe(true);
    expect(a.getName()).toBe('sven1');
    expect(b.getName()).toBe('sven1');
  })

  it('用代理实现单例模式', () => {
    const a = new ProxySingleton('sven1');
    const b = new ProxySingleton('sven2');

    expect(a === b).toBe(true);
    expect(a.getName()).toBe('sven1');
    expect(b.getName()).toBe('sven1');
  })

  it('惰性单例', () => {
    const fn = jest.fn(msg => msg);

    const createSingleFn = getSingle(fn);
    expect(fn).not.toHaveBeenCalled();
    let res = createSingleFn('HelloWorld');
    expect(res).toBe('HelloWorld');
    expect(fn).toBeCalledTimes(1);
    res = createSingleFn('HiWorld');
    expect(res).toBe('HelloWorld');
    expect(fn).toBeCalledTimes(1);
  })
})

