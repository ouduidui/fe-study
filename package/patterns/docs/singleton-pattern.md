# 单例模式

## 定义

保证一个类仅有一个示例，并提供一个访问它的全局访问点。

## 实现简单的单例模型

我们通过`Singleton.getInstance`来获取`Singleton`类的唯一对象。

```javascript
// 定义一个类
const Singleton = function (name) {
  this.name = name;
  // 用于保存单例实例
  this.instance = null;
}

Singleton.prototype.getName = function() {
  return this.name;
}

// 开放一个静态方法，通过调用该静态方法获取实例
Singleton.getInstance = function(name) {
  // 判断是否有示例，没有的话新建实例
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  // 返回实例
  return this.instance;
}



// 测试用例
it('简单的单例模型', () => {
  const a = Singleton.getInstance('sven1');
  const b = Singleton.getInstance('sven2');

  expect(a === b).toBe(true);
  expect(a.getName()).toBe('sven1');
  expect(b.getName()).toBe('sven1');
})
```

## 透明的单例模式

为了把`instance`封装起来，使用了自执行的匿名函数和闭包，在匿名函数中放回了真正的构造函数。

```java
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

  
// 测试用例
it('透明的单例模式', () => {
	const a = new OpenSingleton('sven1');
	const b = new OpenSingleton('sven2');

	expect(a === b).toBe(true);
	expect(a.getName()).toBe('sven1');
	expect(b.getName()).toBe('sven1');
  })
```

## 用代理实现单例模式

```javascript
// 先定义类
const Singleton = function(name) {
  this.name = name;
}

Singleton.prototype.getName = function() {
  return this.name;
}

// 定义一个代理类，来实现单例模式
const ProxySingleton = (function() {
  let instance;

  // 返回构造函数
  return function(name) {
    if(!instance) {
      instance = new Singleton(name);
    }
    // 返回实例
    return instance;
  }
})()


// 测试用例
it('用代理实现单例模式', () => {
  const a = new ProxySingleton('sven1');
  const b = new ProxySingleton('sven2');

  expect(a === b).toBe(true);
  expect(a.getName()).toBe('sven1');
  expect(b.getName()).toBe('sven1');
})
```

## 惰性单例

惰性单例指的是在需要的时候才创建对象实例。

> 把创建实例对象的指责和管理单例的指责分别放置在两个方法里，这两个方法可以独立变化而互不影响。

```javascript
// 初始化时不调用fn
const getSingle = function(fn) {
  let res; // 用于保存结果
  
  return function() {
    return res || (res = fn.apply(this, arguments))
  }
}


// 测试用例
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
```

