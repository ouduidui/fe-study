describe('数组扁平化', () => {
  const arr = [1, 2, 3, 4, [1, 2, 3, 4, ['a', 'b', 'c', ['a', 'b']], [1, 2, 3]], { a: 1 }];
  it('使用reduce实现简易版扁平化', () => {
    const flat = require('../../src/array/flat/simpleByReduce');
    expect(flat(arr)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 'a', 'b', 'c', 'a', 'b', 1, 2, 3, { a: 1 }]);
  });

  it('使用栈实现简易版扁平化', () => {
    const flat = require('../../src/array/flat/simpleByStack');
    expect(flat(arr)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 'a', 'b', 'c', 'a', 'b', 1, 2, 3, { a: 1 }]);
  });

  it('完整版实现', () => {
    const flat = require('../../src/array/flat/complex');
    expect(flat(arr)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, ['a', 'b', 'c', ['a', 'b']], [1, 2, 3], { a: 1 }]);
    expect(flat(arr, 1)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, ['a', 'b', 'c', ['a', 'b']], [1, 2, 3], { a: 1 }]);
    expect(flat(arr, 2)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 'a', 'b', 'c', ['a', 'b'], 1, 2, 3, { a: 1 }]);
    expect(flat(arr, -1)).toStrictEqual([1, 2, 3, 4, 1, 2, 3, 4, 'a', 'b', 'c', 'a', 'b', 1, 2, 3, { a: 1 }]);
  });
});
