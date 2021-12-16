const Promise = require("../Promise");

/**
 * Promise/A+测试
 *   - yarn test—promise
 *   - promises-aplus-tests javascript_api/promise/__test__/index.js
 * */

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;
