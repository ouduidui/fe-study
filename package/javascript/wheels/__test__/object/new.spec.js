const newObject = require('../../src/object/new/index');

describe('new', () => {
  it('happy path', () => {
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.intro = function () {
      return {
        name: this.name,
        age: this.age
      };
    };

    const person = newObject(Person, 'OUDUIDUI', 18);
    expect(person.name).toBe('OUDUIDUI');
    expect(person.age).toBe(18);
    expect(person.intro()).toStrictEqual({
      name: 'OUDUIDUI',
      age: 18
    });
    expect(person.__proto__ === Person.prototype).toBe(true);
    expect(person instanceof Person).toBe(true);
  });

  it('构造函数有返回值', () => {
    function Person(name, age) {
      return {
        name: name,
        age: age,
        intro: function () {
          return {
            name: this.name,
            age: this.age
          };
        }
      };
    }

    const person = newObject(Person, 'OUDUIDUI', 18);
    expect(person.name).toBe('OUDUIDUI');
    expect(person.age).toBe(18);
    expect(person.intro()).toStrictEqual({
      name: 'OUDUIDUI',
      age: 18
    });
    // 如果构造函数有返回值的话，示例的原型不会是构造函数
    expect(person.__proto__ === Person.prototype).toBe(false);
    expect(person instanceof Person).toBe(false);
    expect(person instanceof Object).toBe(true);
  });
});
