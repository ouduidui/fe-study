define('Test', ['exports'], (function (exports) { 'use strict';

  const commonMsg = 'hello world';

  const sayHi = () => {
    console.log(commonMsg);
  };

  exports.sayHi = sayHi;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
