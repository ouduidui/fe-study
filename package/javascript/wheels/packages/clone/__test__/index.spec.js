const shallowCopy = require('../src/shallowCopy');
const deepClone = require('../src/deepClone')

describe('浅拷贝', () => {
  it('happy path', () => {
    expect(shallowCopy(1)).toBe(1);
    expect(shallowCopy('test')).toBe('test');
    expect(shallowCopy(null)).toBe(null);

    const arr = [1, [2, 3], {a: 4}];
    const newArr = shallowCopy(arr);
    expect(Array.isArray(newArr)).toBe(true);
    expect(newArr).not.toBe(arr);
    expect(newArr[0]).toBe(arr[0]);
    expect(newArr[1]).toBe(arr[1]);
    expect(newArr[2]).toBe(arr[2]);


    const obj = {a: 1, b: 2, c: {d: 3}};
    const newObj = shallowCopy(obj);

    expect(typeof newObj).toBe('object');
    expect(newObj).not.toBe(obj);
    expect(Object.keys(newObj)).toEqual(Object.keys(obj));
    expect(newObj.a).toBe(obj.a);
    expect(newObj.b).toBe(obj.b);
    expect(newObj.c).toBe(obj.c);
  })
})

describe('深拷贝', () => {
  it('happy path', () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone('test')).toBe('test');
    expect(deepClone(null)).toBe(null);

    const arr = [1, [2, 3], {a: 4}];
    const newArr = deepClone(arr);
    expect(Array.isArray(newArr)).toBe(true);
    expect(newArr).not.toBe(arr);
    expect(newArr[0]).toBe(arr[0]);
    expect(newArr[1]).not.toBe(arr[1]);
    expect(newArr[1]).toEqual(arr[1]);
    expect(newArr[2]).not.toBe(arr[2]);
    expect(newArr[2]).toEqual(arr[2]);

    const obj = {a: 1, b: 2, c: {d: 3}};
    const newObj = deepClone(obj);

    expect(typeof newObj).toBe('object');
    expect(newObj).not.toBe(obj);
    expect(Object.keys(newObj)).toEqual(Object.keys(obj));
    expect(newObj.a).toBe(obj.a);
    expect(newObj.b).toBe(obj.b);
    expect(newObj.c).not.toBe(obj.c);
  })

  it('循环递归问题', () => {
    const obj = {a: 1};
    obj.b = obj;

    const newObj = deepClone(obj);
    expect(newObj.a).toBe(1);
    expect(newObj.b).toBe(obj.b);
  })

  describe('特殊对象', () => {
    it('Map', () => {
      const map = new Map([['a', {b: 1}]]);
      const newMap = deepClone(map);
      expect(newMap instanceof Map).toBe(true);
      expect(newMap).not.toBe(map);
      expect(newMap.size).toBe(map.size);
      expect(newMap.get('a')).toEqual(map.get('a'));
      expect(newMap.get('a')).not.toBe(map.get('a'));
    })

    it('Set', () => {
      const obj = {a: 1}
      const set = new Set([obj]);
      const newSet = deepClone(set);
      expect(newSet instanceof Set).toBe(true);
      expect(newSet).not.toBe(set);
      expect(set.size).toBe(set.size);
      expect(newSet.has(obj)).toBe(false);
      expect(Array.from(newSet)[0].a).toBe(1);
    })

    it('WeakMap', () => {
      const obj = {a: 1}
      const weakMap = new WeakMap([[obj, 'b']]);
      const newWeakMap = deepClone(weakMap);
      expect(newWeakMap instanceof WeakMap).toBe(true);
      expect(newWeakMap).not.toBe(weakMap);
      expect(newWeakMap.size).toBe(weakMap.size);
      expect(newWeakMap.get(obj)).toBe(undefined);
    })

    it('WeakSet', () => {
      const obj = {a: 1};
      const weakSet = new WeakSet([obj]);
      const newWeakSet = deepClone(weakSet);
      expect(newWeakSet instanceof WeakSet).toBe(true);
      expect(newWeakSet).not.toBe(weakSet);
      expect(newWeakSet.size).toBe(weakSet.size);
      expect(newWeakSet.has(obj)).toBe(false);
    })

    it('Function', () => {
      const arrowFunc = () => {};
      const newArrowFunc = deepClone(arrowFunc);
      expect(newArrowFunc).toBe(arrowFunc);

      const func = function (a, b) {
        return a + b;
      }
      const newFunc = deepClone(func);
      expect(newFunc).not.toBe(func);
      expect(newFunc(1, 2)).toBe(func(1, 2));
    })

    it('Date', () => {
      const date = new Date();
      const newDate = deepClone(date);

      expect(newDate instanceof Date).toBe(true);
      expect(newDate).not.toBe(date);
      expect(newDate.getTime()).toBe(date.getTime());
    })

    it('RegExp', () => {
      const regExp = new RegExp('ab+c', 'i');
      const newRegExp = deepClone(regExp);

      expect(newRegExp instanceof RegExp).toBe(true);
      expect(newRegExp).not.toBe(regExp);
      expect(newRegExp.test('abc')).toBe(regExp.test('abc'))
      expect(newRegExp.test('abcd')).toBe(regExp.test('abcd'))
    })

    it('Error' , () => {
      const err = new Error();
      const newErr = deepClone(err);
      expect(newErr).toBe(err);
    })
  })
})
