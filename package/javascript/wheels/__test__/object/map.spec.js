const Map = require('../../src/object/es/map');

describe('Map', () => {
  it('Happy Path', () => {
    const obj = {c: 4};
    const map = new Map([
      ['a', 2],
      [[1, 2, 3], {b: 1}],
      [obj, false]]
    );
    expect(typeof map).toBe('object');
    expect(map.size).toBe(3);
    expect(map.has('a')).toBe(true);
    expect(map.has([1, 2, 3])).toBe(false);
    expect(map.has(obj)).toBe(true);

    expect(map.get('a')).toBe(2);
    expect(map.get(obj)).toBe(false);

    map.delete('a');
    expect(map.size).toBe(2);
    expect(map.has('a')).toBe(false);

    map.delete({c: 4});
    expect(map.size).toBe(2);
    map.delete(obj);
    expect(map.size).toBe(1);

    map.clear();
    expect(map.size).toBe(0);
  })

  it('不能存在相同的Key', () => {
    const obj = {a: 1};

    const map = new Map([
      ['a', 1],
      ['a', 2],
      [obj, 3]
    ]);

    expect(map.size).toBe(2);

    map.set(obj, 4);
    expect(map.size).toBe(2);

    map.set({a: 1}, 4);
    expect(map.size).toBe(3);
  })

  it('keys', () => {
    const obj = {a: 1};
    const arr = [1,2,3];
    const map = new Map([
      [obj, obj],
      [arr, arr],
      ['a', 'a'],
      [1, 1]
    ])
    const keys = map.keys();
    expect(typeof keys[Symbol.iterator]).toBe('function');

    let localKeys = [obj, arr, 'a', 1];
    const len1 = localKeys.length;
    let key;
    for(let i = 0; i < len1; i++) {
      key = keys.next();
      expect(localKeys.includes(key.value)).toBe(true);
      localKeys = localKeys.filter(k => k !== key.value);
    }

    expect(keys.next().done).toBe(true);
    expect(localKeys.length).toBe(0);


    const values = map.values();
    expect(typeof values[Symbol.iterator]).toBe('function');

    let localValues = [obj, arr, 'a', 1];
    const len2 = localValues.length;
    let value;
    for(let i = 0; i < len2; i++) {
      value = values.next();
      expect(localValues.includes(value.value)).toBe(true);
      localValues = localValues.filter(k => k !== value.value);
    }

    expect(values.next().done).toBe(true);
    expect(localValues.length).toBe(0);

  })
})
