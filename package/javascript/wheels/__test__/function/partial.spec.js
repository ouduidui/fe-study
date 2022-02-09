const partial = require('../../src/function/partial/index');

describe('偏函数', () => {
  it('happy path', () => {
    function add(a, b, c, d) {
      return a + b + c + d;
    }

    const add2 = partial(add, 1);

    expect(typeof add2 === 'function').toBe(true);
    expect(add2(2, 3, 4)).toBe(add(1, 2, 3, 4));
  });
});
