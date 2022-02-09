# 实现 ES6 新类型

## Set

### 思路

`Set`对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会**出现一次**，即 Set 中的元素是唯一的。

- 实例属性

  - size：返回`Set`对象中的值的个数

- 实例方法

  - `add(value)`：在`Set`的尾部添加一个元素。返回该`Set`对象

  - `clear()`：移除`Set`对象内的所有元素

  - `delete(value)`：移除`Set`中与这个值相等的元素，返回`has(value)`在这个操作前返回的值

  - `entries()`：返回一个新的迭代器对象，该对象包含`Set`对象中的按插入顺序排列的所有元素的值的`[value, value]`数组

  - `forEach(callback[, thisArg])`：按照插入顺序，为`Set`对象中的每一个值调用一次callBackFn。如果提供了`thisArg`参数，回调中的`this`会是这个参数

  - `has(val)`：返回一个布尔值，表示该值在`Set`中存在与否

  - `values()`：返回一个新的迭代器，该对象包含`Set`对象中的按插入顺序排列的所有元素的值

  - `@@iterator]()`：同`values()`

### 实现

```javascript
/**
 * 实现 Set
 * @author 欧怼怼
 * @param values {*[]}
 * @returns {Set}
 */
class Set {
  constructor(values) {
    this._values = [];
    this.size = 0;

    // 迭代属性
    this[Symbol.iterator] = this.values;

    values.length && values.forEach((v) => this.add(v));
  }

  /**
   * 判断是否存在
   * @param value {*}
   * @return {boolean}
   */
  has(value) {
    return this._values.includes(value);
  }

  /**
   * 添加
   * @param value
   */
  add(value) {
    if (!this.has(value)) {
      this._values.push(value);
      this.size++;
    }
    return this;
  }

  /**
   * 删除
   * @param value
   * @return {boolean}
   */
  delete(value) {
    const hasValue = this.has(value);
    if (hasValue) {
      this._values = this._values.filter((v) => v !== value);
      this.size--;
    }
    return hasValue;
  }

  /**
   * 清空
   */
  clear() {
    this._values = [];
    this.size = 0;
  }

  /**
   * 获取values组成的迭代器
   * @return {Generator<*, void, *>}
   */
  values() {
    return this._createIterator([...this._values]);
  }

  /**
   * 返回一个新的迭代器对象
   * @return {Generator<*, void, *>}
   */
  entries() {
    const entries = [];
    for (let value of this._values) {
      entries.push([value, value]);
    }

    return this._createIterator(entries);
  }

  /**
   * 遍历
   * @param callback
   * @param thisArg
   */
  forEach(callback, thisArg = {}) {
    for (let i = 0; i < this._values.length; i++) {
      const value = this._values[i];
      callback.call(thisArg, value, i, this);
    }
  }

  /**
   * 生成迭代器
   * @param items {any[]}
   * @return {Generator<*, void, *>}
   * @private
   */
  *_createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}

module.exports = Set;

```

## Map

### 思路

**`Map`** 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。`Map`中的键只会**出现一次**，即 `Map` 中的键是唯一的。

- 实例属性

  - size：返回`Map`对象中的值的个数

- 实例方法

  - `set(key, value)`：在`Map`的尾部添加一个键值对。返回该`Map`对象

  - `clear()`：移除`Map`对象内的所有键值对

  - `delete(key)`：移除`Map`中与这个键相等的键值对，返回`has(key)`在这个操作前返回的值

  - `entries()`：返回一个新的迭代器对象，该对象包含`Map`对象中的按插入顺序排列的所有键值对的值的`[key, value]`数组

  - `forEach(callback[, thisArg])`：按照插入顺序，为`Map`对象中的每一个值调用一次callBackFn。如果提供了`thisArg`参数，回调中的`this`会是这个参数

  - `has(key)`：返回一个布尔值，表示该键在`Map`中存在与否

  - `keys()`：返回一个新的迭代器，该对象包含`Map`对象中的按插入顺序排列的所有元素的`key`值

  - `values()`：返回一个新的迭代器，该对象包含`Map`对象中的按插入顺序排列的所有元素的`value`值

  - `@@iterator]()`：同`entries()`

### 实现

```javascript
/**
 * 实现 Map
 * @author 欧怼怼
 * @param values {[*, *][]}
 * @returns {Map}
 */
class Map {
  constructor(values = []) {
    this._values = Object.create(null);
    this.size = 0;
    this._keys = [];
    this._keyMap = {};

    // 迭代属性
    this[Symbol.iterator] = this.entries;

    values.length && values.forEach((v) => this.set(v[0], v[1]));
  }

  /**
   * 判断是否存在该key
   * @param key {*}
   * @return {boolean}
   */
  has(key) {
    const keyStr = this._defaultToString(key);
    return this._values[keyStr] !== undefined && this._keyMap[keyStr] === key;
  }

  /**
   * 插入新值
   * @param key
   * @param value
   * @return {Map}
   */
  set(key, value) {
    if (!this.has(key)) {
      const keyStr = this._defaultToString(key);
      this._values[keyStr] = value;
      this._keyMap[keyStr] = key;
      this._keys.push(keyStr);
      this.size++;
    }

    return this;
  }

  /**
   * 获取值
   * @param key {*}
   * @return {*}
   */
  get(key) {
    return this._values[this._defaultToString(key)];
  }

  /**
   * 删除值
   * @param key {*}
   * @return {boolean}
   */
  delete(key) {
    const hasKey = this.has(key);
    if (hasKey) {
      const keyStr = this._defaultToString(key);
      delete this._values[keyStr];
      delete this._keyMap[keyStr];
      this._keys = this._keys.filter((k) => k !== keyStr);
      this.size--;
    }
    return hasKey;
  }

  /**
   * 清空Map
   */
  clear() {
    this._values = Object.create(null);
    this._keyMap = {};
    this._keys = [];
    this.size = 0;
  }

  /**
   * 获取keys组成的迭代器
   * @return {Generator<*, void, *>}
   */
  keys() {
    let keys = [];
    for (let key of this._keys) {
      keys.push(this._keyMap[key]);
    }
    return this._createIterator(keys);
  }

  /**
   * 获取values组成的迭代器
   * @return {Generator<*, void, *>}
   */
  values() {
    let values = [];
    for (let key of this._keys) {
      values.push(this._values[key]);
    }

    return this._createIterator(values);
  }

  /**
   * 返回由key和value组成的迭代器
   * @return {Generator<*, void, *>}
   */
  entries() {
    let map = [];
    for (let key of this._keys) {
      map.push([this._keyMap[key], this._values[key]]);
    }
    return this._createIterator(map);
  }

  /**
   *
   * @param callback {Function}
   * @param thisArg {object}
   */
  forEach(callback, thisArg = {}) {
    for (let k of this._keys) {
      const key = this._keyMap[k];
      const value = this._values[k];
      callback.call(thisArg, value, key, this);
    }
  }

  /**
   * 将其他类型的key生成字符串key
   * @param key {*}
   * @return {string}
   * @private
   */
  _defaultToString(key) {
    if (key === null) return 'NULL';
    if (key === undefined) return 'UNDEFINED';

    const type = Object.prototype.toString.call(key);
    if (type === '[object Object]' || type === '[object Array]') return JSON.stringify(key);

    return key.toString();
  }

  /**
   * 生成迭代器
   * @param items {any[]}
   * @return {Generator<*, void, *>}
   * @private
   */
  *_createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}
```
