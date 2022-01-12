const Set = require('../../src/object/es/set');
const Map = require('../../src/object/es/map');

describe('Set', () => {
  it('Happy Path', () => {
    const obj = { a: 1 };
    const set = new Set([1, 'a', obj]);

    expect(typeof set).toBe('object');
    expect(set.size).toBe(3);
    expect(set.has(1)).toBe(true);
    expect(set.has('a')).toBe(true);
    expect(set.has(obj)).toBe(true);
    expect(set.has({ a: 1 })).toBe(false);

    set.delete(1);
    expect(set.size).toBe(2);
    expect(set.has(1)).toBe(false);

    set.delete({ a: 1 });
    expect(set.size).toBe(2);
    expect(set.has(obj)).toBe(true);

    set.clear();
    expect(set.size).toBe(0);
  });

  it('不能存在相同的Key', () => {
    const obj = { a: 1 };
    const set = new Set([obj, 'a']);
    expect(set.size).toBe(2);

    set.add(obj);
    expect(set.size).toBe(2);

    set.add({ a: 1 });
    expect(set.size).toBe(3);
  });

  it('values', () => {
    const obj = { a: 1 };
    const localValues = [obj, 'a', 1];
    const set = new Set(localValues);

    const values = set.values();
    expect(typeof values[Symbol.iterator]).toBe('function');

    let value;
    for (let i = 0; i < localValues.length; i++) {
      value = values.next();
      expect(value.value === localValues[i]).toBe(true);
    }
    expect(values.next().done).toBe(true);
  });

  it('entries', () => {
    const obj = { a: 1 };
    const localValues = [obj, 'a', 1];
    const set = new Set(localValues);

    const entries = set.entries();
    for (let idx in localValues) {
      const value = entries.next().value;
      const localVal = localValues[idx];
      expect(value[0]).toBe(localVal);
      expect(value[1]).toBe(localVal);
    }

    let i = 0;
    for (const entry of set) {
      const localVal = localValues[i++];
      expect(entry).toBe(localVal);
    }
  });

  it('forEach', () => {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    const localValues = [obj, arr, 1, 'a'];
    const set = new Set(localValues);

    let i = 0;

    set.forEach(
      function (value, index, s) {
        expect(value).toBe(localValues[i]);
        expect(index).toBe(i);
        expect(s).toBe(set);
        expect(this.msg).toBe('helloWorld');
        i++;
      },
      { msg: 'helloWorld' }
    );
  });
});
