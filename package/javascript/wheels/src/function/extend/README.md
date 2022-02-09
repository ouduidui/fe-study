# 继承

## 思路

在`ES6`语法出来之前，JavaScript还没有`class`和`extend`，因此我们需要通过`function`去封装一个构造函数，来实现一个类。但而对于类继承，也需要我们自己去封装实现。

而对于继承类，无非就是需要在子类上继承到父类的原型属性和原型方法。

下面我们就通过最简单的继承开始。

## 实现

我们先创建一个类`Color`，后面的实现都以它为父类来实现。

```javascript
function Colors(color) {
  this.colors = ['red', 'blue'];
  if (color) {
    this.colors.push(color);
  }
}

Colors.prototype.getColors = function () {
  return this.colors;
};
```

### 原型链实现

该方法是通过创建一个父类实例，然后绑定到子类的原型链上。

```javascript
function Colors1() {}
Colors1.prototype = new Colors();
```

而这个方法有两个缺点：

- 一个就是子类在实例化的时候无法给父类构造函数传参

- 另一个就是子类原型包含的引用类型属性将被所有实例共享

```javascript
const c1 = new Color1('yellow');
console.log(c1.getColors()); // ['red', 'blue']


c1.colors.push('yellow');
console.log(c1.getColors()); // ['red', 'blue', 'yellow']
const c2 = new Color1();
console.log(c2.getColors()); // ['red', 'blue', 'yellow']
```

### 借用构造函数实现继承

该方法是在子类构造函数中，调用一次父类构造函数并且将其执行上下文绑定为子类的上下文`this`。

```javascript
function Colors1(color) {
  Colors.call(this, color);
}
```

这个方法很显然解决了原型链继承的两个缺陷，但是它却无法继承父类原型上的属性和方法。

```javascript
let c1 = new Colors1('yellow');
console.log(c1.colors); // ['red', 'blue', 'yellow']

c1.colors.push('black'); 
console.log(c1.colors); // ['red', 'blue', 'yellow', 'black']
const c2 = new Color1();
console.log(c2.colors); // ['red', 'blue', 'yellow']

console.log(c1.getColors);  // undefined
```

### 组合继承

我们可以发现其实上面两个方法是互补的，因此组合继承实质上就是将上面两个方法做一个结合。

```javascript
function Colors1(color) {
  Colors.call(this, color);
}

Colors1.prototype = new Colors();
Colors1.prototype.construct = Colors1;


let c1 = new Colors1('yellow');
console.log(c1.getColors()); // ['red', 'blue', 'yellow']

c1.colors.push('black'); 
console.log(c1.getColors()); // ['red', 'blue', 'yellow', 'black']
const c2 = new Color1();
console.log(c2.getColors()); // ['red', 'blue', 'yellow']
```

但该方法还有一个小小的缺点，就是它执行了两次父类的构造函数。

### 寄生式组合继承

该继承方法跟组合继承很类似，唯一的不同就是它继承父类原型不是通过执行父类构造函数，而是通过创建一个对象并绑定父类的原型。

```javascript
function Colors1(color) {
  Colors.call(this, color);
}

Colors1.prototype = Object.create(Colors.prototype);
Colors1.prototype.construct = Colors1;
```

当时，我们可以将其进行封装：

```javascript
/**
 * 实现寄生式组合继承
 * @author 欧怼怼
 * @param child {*}
 * @param parent {*}
 */
function extend(child, parent) {
  // 以父类原型对象作为原型初始一个对象
  let prototype = Object.create(parent.prototype);
  // 绑定子类构造函数
  prototype.constructor = child;
  // 将prototype对象绑定到子类原型上
  child.prototype = prototype;
}
```

```javascript
function Colors1(color) {
  Colors.call(this, color);
}

extend(Colors1, Colors);

let c1 = new Colors1('yellow');
console.log(c1.getColors()); // ['red', 'blue', 'yellow']

c1.colors.push('black'); 
console.log(c1.getColors()); // ['red', 'blue', 'yellow', 'black']
const c2 = new Color1();
console.log(c2.getColors()); // ['red', 'blue', 'yellow']
```