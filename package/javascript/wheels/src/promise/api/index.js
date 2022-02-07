/**
 * Promise 三种状态
 * @desc 待定状态的 Promise 对象要么会通过一个值被兑现（fulfilled），要么会通过一个原因（错误）被拒绝（rejected）。当这些情况之一发生时，我们用 promise 的 then 方法排列起来的相关处理程序就会被调用
 * @type {{FULFILLED: string, PENDING: string, REJECTED: string}}
 */
const PROMISE_STATE = {
  PENDING: 'pending', // 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝
  FULFILLED: 'fulfilled', // 已兑现（fulfilled）: 意味着操作成功完成
  REJECTED: 'rejected' // 已拒绝（rejected）: 意味着操作失败
};

class Promise {
  /**
   * 构造函数
   * @param executor {(resolve:(value: *) => void, reject:(reason: *) => void)=> *}
   */
  constructor(executor) {
    // 初始化状态
    this.promiseState = PROMISE_STATE.PENDING;
    // 成功的值
    this.value = undefined;
    // 存储 onFulfilled 的数组
    this.onResolvedCallbacks = [];

    /**
     * resolve方法
     * @param value {*}
     */
    const resolve = (value) => {
      // 只能在状态为pending的时候执行
      if (this.promiseState === PROMISE_STATE.PENDING) {
        this.promiseState = PROMISE_STATE.FULFILLED; // 修改状态
        this.value = value; // 保存值
        this.onResolvedCallbacks.forEach((fn) => fn()); // 调用所有 onFulfilled 回调
      }
    };

    // 失败的原因
    this.reason = undefined;
    // 存储onRejected的数组
    this.onRejectedCallbacks = [];
    /**
     * reject方法
     * @param reason {*}
     */
    const reject = (reason) => {
      if (this.promiseState === PROMISE_STATE.PENDING) {
        this.promiseState = PROMISE_STATE.REJECTED; // 修改状态
        this.reason = reason; // 保存失败原因
        this.onRejectedCallbacks.forEach((fn) => fn()); // 调用所有 onRejectedCallbacks 回调
      }
    };

    try {
      // 执行 executor 函数
      executor(resolve, reject);
    } catch (e) {
      // 如果executor执行报错，则调用reject
      reject(e);
    }
  }

  /**
   * Promise.prototype.then
   * @param [onFulfilled] {(value: *) => *}  当 Promise 变成接受状态（fulfilled）时调用的函数
   * @param [onRejected] {(reason: *) => *}  当 Promise 变成拒绝状态（rejected）时调用的函数
   * @return {Promise}
   */
  then(onFulfilled, onRejected) {
    // 处理 onFulfilled 回调
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // 处理 onRejected 回调
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    // 返回一个新的Promise实例
    const newPromise = new Promise((resolve, reject) => {
      /**
       * 定义一个异步处理函数
       * @param fn {() => *}
       */
      const asyncHandler = (fn) => {
        // 使用setTimeout来模拟异步操作
        setTimeout(() => {
          try {
            // 得到返回值
            const res = fn();
            resolvePromise(newPromise, res, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      // 使用异步处理函数包裹onFulfilled和onRejected
      const fulfilledHandler = () => asyncHandler(() => onFulfilled(this.value));
      const rejectedHandler = () => asyncHandler(() => onRejected(this.reason));

      // 状态为fulfilled的时候，异步执行onFulfilled，并传入this.value
      if (this.promiseState === PROMISE_STATE.FULFILLED) {
        fulfilledHandler();
      }
      // 状态为rejected的时候，onRejected，并传入this.reason
      else if (this.promiseState === PROMISE_STATE.REJECTED) {
        rejectedHandler();
      }
      // 状态为pending的时候，将onFulfilled、onRejected存入数组
      else if (this.promiseState === PROMISE_STATE.PENDING) {
        this.onResolvedCallbacks.push(fulfilledHandler);
        this.onRejectedCallbacks.push(rejectedHandler);
      }
    });

    return newPromise;
  }

  /**
   * Promise.prototype.catch
   * @desc 用于您的promise组合中的错误处理
   * @param callback {(reason: *) => *}
   * @return {Promise}
   */
  catch(callback) {
    return this.then(null, callback);
  }

  /**
   * Promise.prototype.finally
   * @desc 在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数
   * @param callback {() => *}
   * @return {Promise}
   */
  finally(callback) {
    return this.then(
      (res) => Promise.resolve(callback()).then(() => res),
      (err) =>
        Promise.reject(callback()).then(() => {
          throw err;
        })
    );
  }

  /**
   * Promise.resolve
   * @desc 返回一个以给定值解析后的Promise对象
   * @param value {*}
   * @return {Promise}
   */
  static resolve(value) {
    return new Promise((resolve) => resolve(value));
  }

  /**
   * Promise.reject
   * @desc 返回一个带有拒绝原因的Promise对象
   * @param reason {*}
   * @return {Promise}
   */
  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason));
  }

  /**
   * Promise.all
   * @desc 只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误
   * @param promises {Promise[]}
   * @return {Promise<*[]>}
   */
  static all(promises) {
    const results = [];

    return new Promise((resolve, reject) => {
      if (!promises.length) resolve(results);
      // 遍历promises一一执行
      for (const promise of promises) {
        promise.then(
          (res) => {
            // 保存结果值
            results.push(res);
            if (results.length === promises.length) {
              resolve(results);
            }
          },
          // 但凡有一个promise执行报错，直接reject回去
          reject
        );
      }
    });
  }

  /**
   * Promise.allSettled
   * @desc 返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果
   * @param promises {Promise[]}
   * @return {Promise<{status: 'fulfilled' | 'rejected', [value]: *, [reason]: *}[]>}
   */
  static allSettled(promises) {
    const results = [];

    return new Promise((resolve, reject) => {
      try {
        if (!promises.length) resolve(results);

        // 遍历promises一一执行
        for (const promise of promises) {
          promise.then(
            (res) => processData({ status: PROMISE_STATE.FULFILLED, value: res }),
            (err) => processData({ status: PROMISE_STATE.REJECTED, reason: err })
          );
        }

        /**
         * 处理数据
         * @param res {{status: 'fulfilled' | 'rejected', [value]: *, [reason]: *}}
         */
        function processData(res) {
          results.push(res);
          if (results.length === promises.length) {
            resolve(results);
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Promise.any
   * @desc 只要其中的一个 promise 成功，就返回那个已经成功的 promise
   * @param promises {Promise[]}
   * @return {Promise<*>}
   */
  static any(promises) {
    return new Promise((resolve, reject) => {
      // 如果传入的参数为空对象，则返回一个已失败状态的 Promise
      if (!promises.length) reject();
      // 如果传入的参数不包含任何 promise，则返回一个异步完成的 Promise
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
            // 如果全部promise执行结束且都没有成功的，则reject报错
            if (i === promises.length) reject(err);
          }
        );
      }
    });
  }

  /**
   * Promise.race
   * @desc 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝
   * @param promises {Promise[]}
   * @return {Promise<*>}
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        promise.then(resolve, reject);
      }
    });
  }
}

/**
 * 处理promise返回
 * @param newPromise {Promise}
 * @param res {*}
 * @param resolve {(value: *) => *}
 * @param reject {(reason: *) => *}
 * @return {*}
 */
function resolvePromise(newPromise, res, resolve, reject) {
  // 循环引用使用
  if (res === newPromise) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 防止多次调用
  let called = false;
  // 如果返回值为一个对象或者函数
  if (res != null && (typeof res === 'object' || typeof res === 'function')) {
    try {
      // 如果返回值是一个promise
      const then = res.then;
      if (typeof then === 'function') {
        // 调用返回值的then
        then.call(
          res,
          // onFulfilled 回调
          (r) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            resolvePromise(newPromise, r, resolve, reject);
          },
          // onRejected 回调
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        // res 为普通的值，直接返回
        resolve(res);
      }
    } catch (e) {
      // 成功和失败只能调用一个
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // res 为普通的值，直接返回
    resolve(res);
  }
}

module.exports = Promise;
