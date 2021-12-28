/**
 * 简单的单例模式
 */

// 定义一个类
const SimpleSingleton = function (name) {
  this.name = name;
  // 用于保存单例实例
  this.instance = null;
}

SimpleSingleton.prototype.getName = function () {
  return this.name;
}

// 开放一个静态方法，通过调用该静态方法获取实例
SimpleSingleton.getInstance = function (name) {
  // 判断是否有示例，没有的话新建实例
  if (!this.instance) {
    this.instance = new SimpleSingleton(name);
  }
  // 返回实例
  return this.instance;
}



/**
 * 透明的单例模式
 */

// 通过自执行的匿名函数创建一个类
const OpenSingleton = (function () {
  // 存储实例
  let instance;

  // 真正的构造函数
  const _OpenSingleton = function (name) {
    // 判断是否有实例，没有则初始化
    if (!instance) {
      this.name = name;
      return instance = this;
    }
    // 返回实例
    return instance;
  }

  // 定义原型函数
  _OpenSingleton.prototype.getName = function () {
    return this.name;
  }

  // 将构造函数返回
  return _OpenSingleton;
})()



/**
 * 用代理实现单例模式
 */

// 先定义类
const Foo = function(name) {
  this.name = name;
}

Foo.prototype.getName = function() {
  return this.name;
}

// 定义一个代理类，来实现单例模式
const ProxySingleton = (function() {
  let instance;

  // 返回构造函数
  return function(name) {
    if(!instance) {
      instance = new Foo(name);
    }
    // 返回实例
    return instance;
  }
})()



/**
 * 惰性单例
 */

// 初始化时不调用fn
const getSingle = function(fn) {
  let res; // 用于保存结果
  
  return function() {
    return res || (res = fn.apply(this, arguments))
  }
}


module.exports = {
  SimpleSingleton,
  OpenSingleton,
  ProxySingleton,
  getSingle
};
