const { unique1, unique2, unique3, unique4, unique5 } = require('../../src/array/unique/index');

describe('数组去重', () => {
  describe('for + splice', () => testCase(unique1));
  describe('indexOf | includes', () => testCase(unique2));
  describe('filter + indexOf', () => testCase(unique3));
  describe('reduce + includes', () => testCase(unique4));
  describe('Set', () => testCase(unique5));
});

function testCase(fn) {
  it('Happy Path', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr = [1, 2, 3, 2, 'a', 'b', 'c', 'e', 'b', obj1, obj2, obj1];
    const expected = [1, 2, 3, 'a', 'b', 'c', 'e', obj1, obj2];
    const res = fn(arr);
    expect(res.length).toBe(expected.length);
    for (let i = 0; i < res.length; i++) {
      expect(expected.includes(res[i])).toBe(true);
    }
  });
}
