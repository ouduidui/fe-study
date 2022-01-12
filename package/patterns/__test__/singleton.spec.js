const ManageGame = require('../packages/singleton/manageGame');
const ManageGameByClass = require('../packages/singleton/manageGameByClass');
const SingletonByIIFE = require('../packages/singleton/iife');
const SingletonByIIFEModule = require('../packages/singleton/iifeModule');
const getInstanceByBlockScope = require('../packages/singleton/blockScope');
const SingletonProxy = require('../packages/singleton/proxy');
const SingletonProxyByProxy = require('../packages/singleton/proxyByProxy');
const { HungrySingleton, LazySingleton } = require('../packages/singleton/lazy');

describe('单例模式', () => {
  it('在JavaScript中，新对象就是一个单例', () => {
    expect({ a: 1 }).not.toBe({ a: 1 });
  });

  it('示例的代码实现', () => {
    const singleton1 = new ManageGame();
    const singleton2 = ManageGame.getInstance();
    const singleton3 = ManageGame.getInstance();

    expect(singleton1).toBe(singleton2);
    expect(singleton2).toBe(singleton3);
  });

  it('示例的代码实现 - 使用class实现', () => {
    const singleton1 = new ManageGameByClass();
    const singleton2 = ManageGameByClass.getInstance();
    const singleton3 = ManageGameByClass.getInstance();

    expect(singleton1).toBe(singleton2);
    expect(singleton2).toBe(singleton3);
  });

  it('使用IIFE方式实现单例模式', () => {
    const singleton1 = new SingletonByIIFE('OUDUIDUI');
    const singleton2 = SingletonByIIFE.getInstance('OU');
    const singleton3 = SingletonByIIFE.getInstance('DUIDUI');

    expect(singleton1).toBe(singleton2);
    expect(singleton2).toBe(singleton3);

    expect(singleton1.name).toBe('OUDUIDUI');
    expect(singleton2.name).toBe('OUDUIDUI');
    expect(singleton3.name).toBe('OUDUIDUI');
  });

  it('使用IIFE方式实现单例模式 - 使用模块模式', () => {
    const singleton1 = SingletonByIIFEModule.getInstance('OUDUIDUI');
    const singleton2 = SingletonByIIFEModule.getInstance('OU');

    expect(singleton1).toBe(singleton2);
    expect(singleton1.name).toBe('OUDUIDUI');
    expect(singleton2.name).toBe('OUDUIDUI');
  });

  it('使用块级作用域方式实现单例模式', () => {
    const singleton1 = getInstanceByBlockScope('OUDUIDUI');
    const singleton2 = getInstanceByBlockScope('OU');

    expect(singleton1).toBe(singleton2);
    expect(singleton1.name).toBe('OUDUIDUI');
    expect(singleton2.name).toBe('OUDUIDUI');
  });

  it('单例模式赋能', () => {
    const singleton1 = new SingletonProxy('OUDUIDUI');
    const singleton2 = SingletonProxy.getInstance('OU');
    const singleton3 = SingletonProxy.getInstance('DUIDUI');

    expect(singleton1).toBe(singleton2);
    expect(singleton2).toBe(singleton3);

    expect(singleton1.getName()).toBe('OUDUIDUI');
    expect(singleton2.getName()).toBe('OUDUIDUI');
    expect(singleton3.getName()).toBe('OUDUIDUI');
  });

  it('单例模式赋能 — 使用 Proxy 实现', () => {
    class DoSomething {
      constructor(name) {
        this.name = name;
      }

      getName() {
        return this.name;
      }
    }

    const Singleton = SingletonProxyByProxy(DoSomething);

    const singleton1 = new Singleton('OUDUIDUI');
    const singleton2 = new Singleton('OU');
    const singleton3 = new Singleton('DUIDUI');

    expect(singleton1).toBe(singleton2);
    expect(singleton2).toBe(singleton3);

    expect(singleton1.getName()).toBe('OUDUIDUI');
    expect(singleton2.getName()).toBe('OUDUIDUI');
    expect(singleton3.getName()).toBe('OUDUIDUI');
  });

  it('惰性单例', () => {
    const singleton1 = new HungrySingleton();
    const singleton2 = new HungrySingleton();
    const singleton3 = new LazySingleton();
    const singleton4 = new LazySingleton();

    expect(singleton1).toBe(singleton2);
    expect(singleton3).toBe(singleton4);
  });
});
