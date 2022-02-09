describe('Object 方法', () => {
  describe('Object.is', () => {
    const is = require('../../src/object/api/is');
    it('happy path', () => {
      expect(is(1, 1)).toBe(true);
      expect(is('a', 'a')).toBe(true);
      expect(is(true, true)).toBe(true);
      expect(is({}, {})).toBe(false);
      expect(is(1, true)).toBe(false);
      expect(is('1', 1)).toBe(false);

      const obj = {};
      expect(is(obj, obj)).toBe(true);
    });

    it('NaN在Object.is是相等的', () => {
      expect(is(NaN, NaN)).toBe(true);
    });

    it('-0和+0在Object.is是不等的', () => {
      expect(is(+0, -0)).toBe(false);
    });
  });

  describe('Object.create', () => {
    const create = require('../../src/object/api/create');
    it('happy path', () => {
      const person = {
        name: '',
        age: 18
      };
      const p = create(person);
      p.name = 'OUDUIDUI';
      expect(p.name).toBe('OUDUIDUI');
      expect(p.age).toBe(18);
      expect(p.__proto__).toBe(person);

      const obj = create(null);
      obj.a = 1;
      expect(obj.a).toBe(1);
      expect(obj.__proto__).toBe(undefined);

      expect(() => create('123')).toThrow(TypeError);
    });

    it('propertiesObject选项', () => {
      const person = {
        name: '',
        age: 18
      };
      const p = create(person, {
        name: {
          value: 'OUDUIDUI',
          writable: false
        }
      });

      expect(p.name).toBe('OUDUIDUI');
      p.name = 'OU';
      expect(p.name).toBe('OUDUIDUI');

      expect(() => create(null, null)).toThrow(TypeError);
    });
  });

  describe('Object.assign', () => {
    const assign = require('../../src/object/api/assign');
    it('happy path', () => {
      const target = { a: 1, b: 2, c: 3 };
      const source1 = { b: 4, c: 5, d: 6 };
      const source2 = { c: 7, e: 8 };

      const returnedTarget = assign(target, source1, source2);
      expect(target).toBe(returnedTarget);
      expect(target).toStrictEqual({ a: 1, b: 4, c: 7, d: 6, e: 8 });
    });
  });
});
