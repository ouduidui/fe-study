class Map {
  /**
   * @param data {[any, any][]}
   */
  constructor(data = []) {
    this.items = {};
    this.size = 0;
    this._keys = {};

    data.length && data.forEach(item => this.set(item[0], item[1]));
  }


  /**
   * 判断是否存在该key
   * @param key {*}
   * @return {boolean}
   */
  has(key) {
    const keyStr = this._defaultToString(key);
    return this.items[keyStr] !== undefined && this._keys[keyStr] === key;
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
      this.items[keyStr] = value;
      this._keys[keyStr] = key;
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
    return this.items[this._defaultToString(key)];
  }

  /**
   * 删除值
   * @param key {*}
   * @return {Map}
   */
  delete(key) {
    if (this.has(key)) {
      const keyStr = this._defaultToString(key);
      delete this.items[keyStr];
      delete this._keys[keyStr];
      this.size--;
    }
    return this;
  }

  /**
   * 清空Map
   */
  clear() {
    this.items = {};
    this._keys = {};
    this.size = 0;
  }

  /**
   * 获取keys组成的迭代器
   * @return {Generator<*, void, *>}
   */
  keys() {
    let keys = [];
    for (let key in this._keys) {
      keys.push(this._keys[key]);
    }
    return this._createIterator(keys);
  }

  /**
   * 获取values组成的迭代器
   * @return {Generator<*, void, *>}
   */
  values() {
    let values = [];
    for (let key in this.items) {
      values.push(this.items[key]);
    }

    return this._createIterator(values);
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
  * _createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}

module.exports = Map;
