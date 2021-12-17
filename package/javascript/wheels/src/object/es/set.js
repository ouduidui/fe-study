class Set {
  /**
   * @param values {any[]}
   */
  constructor(values) {
    this._values = [];
    this.size = 0;

    this[Symbol.iterator] = this.values;

    values.length && values.forEach(v => this.add(v));
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
    if(!this.has(value)) {
      this._values.push(value);
      this.size++;
    }
    return this;
  }

  delete(value) {
    if(this.has(value)) {
      this._values = this._values.filter(v => v !== value);
      this.size--;
    }
    return this;
  }

  clear() {
    this._values = [];
    this.size = 0;
  }

  values() {
    return this._createIterator([...this._values]);
  }

  entries() {
    const entries = [];
    for (let value of this._values) {
      entries.push([value, value]);
    }

    return this._createIterator(entries);
  }

  forEach(callback, context = {}) {
    for (let i = 0; i < this._values.length; i++) {
      const value = this._values[i];
      callback.call(context, value, i, this);
    }
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

module.exports = Set;
