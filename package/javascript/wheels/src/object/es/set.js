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
