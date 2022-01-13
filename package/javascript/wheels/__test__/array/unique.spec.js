describe('数组去重', () => {
  describe('for + splice', () => testCase(require('../../src/array/unique/for-splice')));
  describe('indexOf | includes', () => testCase(require('../../src/array/unique/indexof-includes')));
  describe('filter + indexOf', () => testCase(require('../../src/array/unique/filter-indexof')));
  describe('reduce + includes', () => testCase(require('../../src/array/unique/reduce-includes')));
  describe('Set', () => testCase(require('../../src/array/unique/set')));
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
