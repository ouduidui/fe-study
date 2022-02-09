const curry = require('../../src/function/curry');

describe('函数柯里化', () => {
  it('happy path', () => {
    function add(a, b, c, d) {
      return a + b + c + d;
    }

    const add2 = curry(add);

    expect(typeof add2 === 'function').toBe(true);
    expect(add2(1)(2)(3)(4)).toBe(add(1, 2, 3, 4));

    const add3 = curry(add);
    expect(() => add3(1, 2, 3)).toThrowError('只能传递一个参数');
  });
});
