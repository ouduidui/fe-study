const instanceOf = require('../../src/object/instanceof/index');

it('instanceof', () => {
  // object
  expect(instanceOf({}, Object)).toBe(true);
  expect(instanceOf({}, Array)).toBe(false);
  // array
  expect(instanceOf([], Array)).toBe(true);
  expect(instanceOf([], Object)).toBe(true);

  // class
  class Test {}
  const test = new Test();
  expect(instanceOf(test, Test)).toBe(true);
  expect(instanceOf(test, Object)).toBe(true);
  expect(instanceOf(test, Array)).toBe(false);
});
