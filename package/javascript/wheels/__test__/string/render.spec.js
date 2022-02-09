const render = require('../../src/string/render/index');

describe('解析模板字符串', () => {
  it('happy path', () => {
    const template = '我叫${name}，我今年${age}岁了，是一名${job}，爱好是${hobby}';
    const data = {
      name: '欧怼怼',
      age: 18,
      job: '前端工程师'
    };
    expect(render(template, data)).toBe('我叫欧怼怼，我今年18岁了，是一名前端工程师，爱好是undefined');
  });

  it('复杂类型测试', () => {
    const template = '对象：${object}，数组：${array}';
    const data = {
      object: { a: 1, b: 2 },
      array: [1, 2, 3, 'a', 'b', 'c', {}]
    };
    expect(render(template, data)).toBe('对象：[object Object]，数组：1,2,3,a,b,c,[object Object]');
  });
});
