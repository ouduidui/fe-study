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

  it('keys & values', () => {
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
      expect(key.value === localKeys[i]).toBe(true);
    }

    expect(keys.next().done).toBe(true);

    const values = map.values();
    expect(typeof values[Symbol.iterator]).toBe('function');

    let localValues = [obj, arr, 'a', 1];
    const len2 = localValues.length;
    let value;
    for(let i = 0; i < len2; i++) {
      value = values.next();
      expect(value.value === localValues[i]).toBe(true);
    }

    expect(values.next().done).toBe(true);
  })

  it('entries', () => {
    const values = [
      [{a: 1}, 1],
      [[1,2,3], 'a'],
      ['a', [1,2,3]],
      [1, {a: 1}]
    ];
    const map = new Map(values);

    const entries = map.entries();
    for(let idx in values) {
      const value = entries.next().value;
      const localValue = values[idx];
      expect(value[0]).toBe(localValue[0]);
      expect(value[1]).toBe(localValue[1]);
    }

    let i = 0;
    for(const entry of map) {
      const localValue = values[i++];
      expect(entry[0]).toBe(localValue[0]);
      expect(entry[1]).toBe(localValue[1]);
    }
  })

  it('forEach', () => {
    const obj = {a: 1};
    const arr = [1,2,3];
    const map = new Map([
      [obj, 1],
      [arr, 'a'],
      ['a', arr],
      [1, obj]
    ]);

    const localKeys = [obj, arr, 'a', 1];
    const localValues = [1, 'a', arr, obj];
    let i = 0;

    map.forEach(function(value, key, m) {
      expect(value).toBe(localValues[i]);
      expect(key).toBe(localKeys[i]);
      expect(m).toBe(map);
      expect(this.msg).toBe('helloWorld');
      i++
    }, {msg: 'helloWorld'})
  })
})
