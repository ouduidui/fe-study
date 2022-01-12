# JavaScript面试题

### 解释一下变量提升

JavaScript引擎的工作方式是先解析代码，获取所有被声明的变量，然后再一行行地运行。这造成的结果就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

```javascript
console.log(a);    // undefined


var a = 1;

function b(){
    console.log(a);
}

b();  // 1
```

上面的代码实际执行顺序是这样的：



第一步，JS引擎将`var a = 1`拆解为`var a = undefined`和`a=1`，并将`var a = undefined`放到了最顶部，`a=1`保留原位。

这样一来代码就是这样：

```javascript
var a = undefined;  // 变量声明被提升上来

console.log(a);    // undefined


a = 1;  // 赋值操作保留原位

function b(){
    console.log(a);
}

b();  // 1
```

第二步就是执行，因此JS引擎逐行从上到下执行，也就是造成了当前的结果，这就是变量提升。



### 理解闭包

#### 什么是闭包

闭包是函数和声明该函数的词法环境的组合。简单来说就是闭包 = 「函数」+ 「函数体内可访问的变量总和」。

举个简单的例子：

```javascript
(function(){
    var a = 1;
    function add() {
        var b = 2;
        var sum = b + a;
        console.log(sum);    // 3
    }

    add();
})()
```

`add`函数本身，以及其内部可访问的变量，即`a`，这两个组合在一起就被成为闭包，仅此而已。

#### 闭包的作用

闭包最大的作用就是隐藏变量，闭包的一大特性就是**内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部被返回（周期结束）了之后**。

基于此特性，JavaScript可以实现私有变量、特权变量、存储变量等。



我们就以私有变量为例。

```javascript
function Person() {
    var name = 'OUDUIDUI';
    this.getName = function() {
        return name;
    }
    this.setName = function(value) {
        name = value;
    }
}


const person = new Person();

console.log(person.getName());  // OUDUIDUI
person.setName('OU')
console.log(person.getName());  // OU
console.log(name);  // name is not defined
```

函数体内的`name`变量只有`getName`和`setName`能有访问，外部无法访问，相对于将其私有化。

### 理解JavaScript的作用域链

JavaScript属于静态作用域，即声明的作用域是根据程序正文在编译时就确定的，有时也称为词法作用域。

其本质是JavaScript在执行过程中会创造可执行上下文，可执行上下文中的词法环境中含有外部词法环境的引用，我们可以通过这个引用获取外部词法环境的变量、声明等，这些引用串联起来一致指向全局的词法环境，因此形成了作用域链。

### ES6模块与CommonJS模块的区别

- 区别：
  
  - commonJS是对模块的浅拷贝，ES6 Module是对模块的引用，即ES6 Module只存只读，不能改变其值，具体点就是指针指向不能变，类似const

- 共同点：
  
  - CommonJS和ES6 Module都可以对引入的对象进行赋值，即对对象内部属性的值进行改变

### JavaScript有哪些类型

JavaScript的类型分为两大类，即原始类型和复杂（引用）类型。

- 原始类型
  
  - boolean、string、number、undefined、null、symbol

- 复杂类型
  
  - Object

> 还有一个没有正式发布但即将加入标准的原始类型BigInt。
> 
> JavaScript中的Number.MAX_SAFE_INTEGER表示最大安全数字，为900719925470991，即在这个数范围内不会出现精度丢失（小数除外）。但是一旦超过这个范围，JavaScript就会出现计算不准确的问题，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出了BigInt来解决这个问题

#### null和undefined的区别

null表示为空，代表此处不应该有值的存在，一个对象可以为null，代表是个空对象，而null本身也是个对象。

undefined表示不存在，JavaScript是一门动态类型语言，成员除了表示存在的空值外，还有可能根本不存在，因为存不存在只有在运行时才会知道，这就是undefined的意义所在。

### 为什么0.1 + 0.2 不等于 0.3

```shell
> 0.1 + 0.2
0.30000000000000004
```

JavaScript的Number类型遵循的是IEEE 754标准，使用的是64位固定长度来表示。

IEEE 754浮点数有三个域组成，分别为sign bit（符号位）、exponent bias（指数偏移值）、fraction（分数值）。64位中，sign bit占1位，exponent bias占了11位，fraction占52位。

通过公式表示浮点数的值：`value = sign x exponent x fraction`



当一个数为正数的时候，sign bit为0，当为负数的时候，sign bit为1。



以`0.1`转换为IEEE 754标准表示为例来解释一下exponent bias和fraction。转换主要历经3个过程：

- 将`0.1`转换为二进制

- 将转换后的二进制通过科学计数法表示

- 将通过科学计数法表示的二进制转换为IEEE 754标准来表示



首先将`0.1`转换成二进制。小数部分转成二进制，只需将其小数部分乘以2，然后取整数部分的结果，然后再用计算后的小数部分重复计算，直至小数部分为0。

因此`0.1`转换为二进制的过程如下：

| 小数  | x2  | 整数部分 |
| --- | --- | ---- |
| 0.1 | 0.2 | 0    |
| 0.2 | 0.4 | 0    |
| 0.4 | 0.8 | 0    |
| 0.8 | 1.6 | 1    |
| 0.6 | 1.2 | 1    |
| 0.2 | 0.4 | 0    |
| 0.4 | 0.8 | 0    |
| 0.8 | 1.6 | 1    |
| 0.6 | 1.2 | 1    |
| ... | ... | ...  |

得到`0.1`的二进制表示为0.0001100110011... （无限循环0011）



紧接着将其二进制转成科学计数法，则为`1.10011001...(无限循环1001) e-4`



最后将其转化成IEEE 754标准表示。

exponent bias（指数偏移值）等于**双精度浮点数固定偏移值**（2^10 -1 = 1023）加上指数实际值的11位二进制表示。（exponent bias占了11位，所以只能够11位二进制）

因此`0.1`的exponent bias等于`1024 + (-4) = 1019`，然后转成11位二进制为`011 1111 1011`。

fraction就是科学计数法后的小数部分，而因为fraction占52位，所以只能抽取前52位小数。

而这里有小细节，52位小数部分最后四位刚好是`1001`，而第53位是`1`，这时候会采取四舍五入，进一位，因此52位小数部分最后四位就变成了`1010`，而这恰恰就是0.1 + 0.2不等于0.3的原因。额



因此`0.1`转成IEEE 754最后的结果为：

```
0 01111111011 1001100110011001100110011001100110011001100110011010
```

但此时将这个IEEE 754标准的数值转成十进制，可以发现值已经变成了`0.100000000000000005551115123126`，而不是`0.1`了。




