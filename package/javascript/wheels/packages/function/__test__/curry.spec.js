const curry = require('../src/curry');

describe('函数柯里化', () => {
  it('happy path', () => {
    function add(a, b, c, d) {
      return a + b + c + d;
    }

    const add2 = curry(add, 1);

    expect(typeof add2 === 'function').toBe(true);
    expect(add2(2)(3)(4)).toBe(add(1, 2, 3, 4));
    expect(add2(2, 3)(4)).toBe(add(1, 2, 3, 4));
    expect(add2(2)(3, 4)).toBe(add(1, 2, 3, 4));
  })
})
