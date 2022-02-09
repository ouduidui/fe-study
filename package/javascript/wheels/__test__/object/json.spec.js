describe('实现JSON方法', () => {
  it('JSON.stringify', () => {
    const stringify = require('../../src/object/json/stringify');

    testStringify(undefined, undefined);
    testStringify(true, 'true');
    testStringify(false, 'false');
    testStringify(123, '123');
    testStringify(NaN, 'null');
    testStringify(Infinity, 'null');
    testStringify(-Infinity, 'null');
    testStringify('abc', '"abc"');
    testStringify(null, 'null');
    testStringify(Symbol(), undefined);
    testStringify(function () {}, undefined);
    testStringify(() => {}, undefined);
    testStringify([undefined, () => {}, Symbol(), 123, 'abc']);
    testStringify(/abc/g, '{}');
    testStringify(new RegExp('abc', 'g'), '{}');
    testStringify(new Date());
    testStringify({
      name: 'OUDUIDUI',
      age: 18,
      now: new Date(),
      unique: Symbol(),
      saySomething: (msg) => console.log(msg),
      otherInfo: {
        hobby: null,
        wife: undefined,
        others: [undefined, null, NaN]
      }
    });

    class SuperType {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }
    testStringify(new SuperType('OUDUIDUI', 18));
    SuperType.prototype.toJSON = function () {
      return {
        hobby: ['cube', 'code'],
        saySomething(msg) {
          console.log(msg);
        }
      };
    };
    testStringify(new SuperType('OUDUIDUI', 18));
    testStringify(new Map([['name', 'OUDUIDUI']]));
    testStringify(new Set(['OUDUIDUI']));

    function testStringify(value, expected) {
      expected && expect(stringify(value)).toStrictEqual(expected);
      expect(stringify(value)).toBe(JSON.stringify(value));
    }
  });

  describe('JSON.parse', () => {
    it('eval实现', () => {
      testCases(require('../../src/object/json/parseByEval'));
    });

    it('new Function 实现', () => {
      testCases(require('../../src/object/json/parseByFunction'));
    });
    function testCases(parse) {
      const str = '{"a":"1", "b":2}';
      expect(parse(str)).toStrictEqual(JSON.parse(str));
    }
  });
});
