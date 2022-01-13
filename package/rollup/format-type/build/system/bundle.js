System.register([], function (exports) {
  'use strict';
  return {
    execute: function () {
      const commonMsg = 'hello world';

      const sayHi = exports('sayHi', () => {
        console.log(commonMsg);
      });
    }
  };
});
