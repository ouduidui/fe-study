class Promise {
  /**
   * 构造器
   * @returns {Promise<object>}
   * @param executor<function>: executor有两个参数：resolve和reject
   */
  constructor(executor) {
    // 初始化状态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 存储onFulfilled的数组
    this.onResolvedCallbacks = [];
    // 存储onRejected的数组
    this.onRejectedCallbacks = [];

    /**
     * resolve 成功函数
     * @param value<any>: 成功的值
     */
    const resolve = (value) => {
      // 只能在状态为pending的时候执行
      if (this.state === 'pending') {
        // resolve调用后，state转化为fulfilled
        this.state = 'fulfilled';
        // 存储value
        this.value = value;
        // 一旦resolve执行，调用onResolvedCallbacks数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    /**
     * reject 失败函数
     * @param reason<any>: 失败的原因
     */
    const reject = (reason) => {
      // 只能在状态为pending的时候执行
      if (this.state === 'pending') {
        // resolve调用后，state转化为rejected
        this.state = 'rejected';
        // 存储reason
        this.reason = reason;
        // 一旦reject执行，调用onRejectedCallbacks数组的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 如果executor执行报错，直接执行reject()
    try {
      // 执行 executor
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  /**
   * then 方法
   * @returns {Promise<object>}
   * @param onFulfilled<function>: 状态为fulfilled时调用
   * @param onRejected<function>: 状态为rejected时调用
   */
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // onRejected如果不是函数，就忽略onRejected，直接抛出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    // 返回一个新的Promise实例
    const newPromise = new Promise((resolve, reject) => {
      // 状态为fulfilled的时候，执行onFulfilled，并传入this.value
      if (this.state === 'fulfilled') {
        // 异步调用
        setTimeout(() => {
          try {
            /**
             * onFulfilled 方法
             * @param value<function>: 成功的结果
             */
            const x = onFulfilled(this.value);
            // 对返回值进行处理
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 状态为rejected的时候，onRejected，并传入this.reason
      if (this.state === 'rejected') {
        // 异步调用
        setTimeout(() => {
          try {
            /**
             * onRejected 方法
             * @param reason<function>: 失败的原因
             */
            const x = onRejected(this.reason);

            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 状态为pending的时候，将onFulfilled、onRejected存入数组
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // 异步调用
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          // 异步调用
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return newPromise;
  }

  /**
   * catch 方法
   * @returns {Promise<object>}
   * @param callback<function>: 处理函数
   */
  catch(callback) {
    return this.then(null, callback);
  }

  /**
   * finally 方法
   * @returns {Promise<object>}
   * @param callback<function>: 处理函数
   */
  finally(callback) {
    return this.then(
      (res) => {
        return Promise.resolve(callback()).then(() => res);
      },
      (err) => {
        return Promise.reject(callback()).then(() => {
          throw err;
        });
      }
    );
  }
}

/**
 * resolvePromise 方法
 * @param newPromise<object>: 新的Promise实例
 * @param x<any>: 上一个then()的返回值
 * @param resolve<function>：Promise实例的resolve方法
 * @param reject<function>：Promise实例的reject方法
 */
function resolvePromise(newPromise, x, resolve, reject) {
  // 循环引用报错
  if (x === newPromise) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      // x 为Promise实例
      if (typeof then === 'function') {
        // 使用call执行then()，call的第一个参数是this，后续即then()的参数，即第二个是成功的回调方法，第三个为失败的回调函数
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve 的结果依旧是promise实例，那就继续解析
            resolvePromise(newPromise, y, resolve, reject);
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // 失败了就直接返回reject报错
            reject(err);
          }
        );
      } else {
        // x 为普通的对象或方法，直接返回
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // x 为普通的值，直接返回
    resolve(x);
  }
}

/**
 * Promise.all 方法
 * @returns {Promise<object>}
 * @param promises<iterable>: 一个promise的iterable类型输入
 */
Promise.all = function (promises) {
  let arr = [];

  return new Promise((resolve, reject) => {
    if (!promises.length) resolve([]);
    // 遍历promises
    for (const promise of promises) {
      promise.then((res) => {
        arr.push(res);
        if (arr.length === promises.length) {
          resolve(arr);
        }
      }, reject);
    }
  });
};

/**
 * Promise.allSettled 方法
 * @returns {Promise<object>}
 * @param promises<iterable>: 一个promise的iterable类型输入
 */
Promise.allSettled = function (promises) {
  let arr = [];

  return new Promise((resolve, reject) => {
    try {
      const processData = (data) => {
        arr.push(data);
        if (arr.length === promises.length) {
          resolve(arr);
        }
      };

      if (!promises.length) resolve([]);
      // 遍历promises
      for (const promise of promises) {
        promise.then(
          (res) => {
            processData({ state: 'fulfilled', value: res });
          },
          (err) => {
            processData({ state: 'rejected', reason: err });
          }
        );
      }
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Promise.any 方法
 * @returns {Promise<object>}
 * @param promises<iterable>: 一个promise的iterable类型输入
 */
Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    // 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise
    if (!promises.length) reject();
    // 如果传入的参数不包含任何 promise，则返回一个 异步完成 （asynchronously resolved）的 Promise。
    if (typeof promises[Symbol.iterator] !== 'function' || promises === null || typeof promises === 'string') {
      resolve();
    }

    let i = 0;
    // 遍历promises
    for (const promise of promises) {
      promise.then(
        (res) => {
          i++;
          resolve(res);
        },
        (err) => {
          i++;
          if (i === promises.length) {
            reject(err);
          }
        }
      );
    }
  });
};

/**
 * Promise.race 方法
 * @returns {Promise<object>}
 * @param promises<iterable>: 一个promise的iterable类型输入
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(resolve, reject);
    }
  });
};

/**
 * Promise.reject 方法
 * @returns {Promise<object>}
 * @param val<any>
 */
Promise.reject = function (val) {
  return new Promise((reject) => reject(val));
};

/**
 * Promise.resolve 方法
 * @returns {Promise<object>}
 * @param val<any>
 */
Promise.resolve = function (val) {
  return new Promise((resolve) => resolve(val));
};

module.exports = Promise;
