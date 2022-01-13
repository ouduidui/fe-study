(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define('Test', ['exports'], factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), factory((global.Test = {})));
})(this, function (exports) {
  'use strict';

  const commonMsg = 'hello world';

  const sayHi = () => {
    console.log(commonMsg);
  };

  exports.sayHi = sayHi;

  Object.defineProperty(exports, '__esModule', { value: true });
});
