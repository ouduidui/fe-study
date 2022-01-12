const flat = require('../../src/array/flat/index');

describe('Flat', () => {
  it('Happy Path', () => {
    const arr = [1, 2, 3, 4, [1, 2, 3, 4, ['a', 'b', 'c', ['a', 'b']], [1, 2, 3]], { a: 1 }];
    const expected = [1, 2, 3, 4, 1, 2, 3, 4, 'a', 'b', 'c', 'a', 'b', 1, 2, 3, { a: 1 }];

    const res = flat(arr);
    expect(res.length).toBe(expected.length);
    for (let i = 0; i < res.length; i++) {
      expect(res[i]).toEqual(expected[i]);
    }
  });
});
