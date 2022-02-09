const String = require('../../src/string/api/index');

describe('字符串原型方法', () => {
  it('trim', () => {
    expect('  OUDUIDUI'._trim()).toBe('OUDUIDUI');
    expect('OUDUIDUI  '._trim()).toBe('OUDUIDUI');
    expect('  OUDUIDUI  '._trim()).toBe('OUDUIDUI');
    expect('  OU DUIDUI '._trim()).toBe('OU DUIDUI');
  });

  it('slice', () => {
    const str = 'The quick brown fox jumps over the lazy dog.';
    expect(str._slice(31)).toBe('the lazy dog.');
    expect(str._slice(4, 19)).toBe('quick brown fox');
    expect(str._slice(-4)).toBe('dog.');
    expect(str._slice(-9, -5)).toBe('lazy');
  });
});
