/**
 * 复制版深拷贝
 * @author 欧怼怼
 */

// 可遍历类型
const MAP_TAG = '[object Map]'; // Map
const SET_TAG = '[object Set]'; // Set
const WEAK_MAP_TAG = '[object WeakMap]'; // WeakMap
const WEAK_SET_TAG = '[object WeakSet]'; // WeakSet
const ARRAY_TAG = '[object Array]'; // Array
const OBJECT_TAG = '[object Object]'; // Object
const ARGUMENTS_TAG = '[object Arguments]'; // Argument
const CAN_TRAVERSE_TYPE = [MAP_TAG, SET_TAG, WEAK_MAP_TAG, WEAK_SET_TAG, ARRAY_TAG, OBJECT_TAG, ARGUMENTS_TAG];

// 不可以遍历类型
const BOOLEAN_TAG = '[object Boolean]'; // Boolean
const NUMBER_TAG = '[object Number]'; // Number
const STRING_TAG = '[object String]'; // String
const SYMBOL_TAG = '[object Symbol]'; // Symbol
const DATE_TAG = '[object Date]'; // Date
const ERROR_TAG = '[object Error]'; // Error
const REGEXP_TAG = '[object RegExp]'; // RegExp
const FUNC_TAG = '[object Function]'; // Function

/**
 * 判断是否为对象
 * @param target {*}
 * @returns {boolean}
 */
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

/**
 * 获取对象类型
 * @param obj {Object}
 * @returns {string}
 */
const getType = (obj) => Object.prototype.toString.call(obj);

/**
 * 处理正则类型
 * @param target {RegExp}
 * @return {RegExp}
 */
function regExpTypeHandle(target) {
  const { source, flags } = target;
  return new target.constructor(source, flags);
}

/**
 * 处理函数类型
 * @param target {Function}
 * @return {Function | null}
 */
function functionTypeHandle(target) {
  // 箭头函数
  if (!target.prototype) return target;

  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcStr = target.toString();

  // 函数内容
  const body = bodyReg.exec(funcStr);
  if (!body) return null;

  // 参数
  const param = paramReg.exec(funcStr);
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
}

/**
 * 处理不可以遍历类型
 * @param target {*}
 * @param type {string}
 * @returns {*}
 */
function handleNotTraverse(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case BOOLEAN_TAG:
      return new Object(Boolean.prototype.valueOf.call(target));
    case NUMBER_TAG:
      return new Object(Number.prototype.valueOf.call(target));
    case STRING_TAG:
      return new Object(String.prototype.valueOf.call(target));
    case SYMBOL_TAG:
      return new Object(Symbol.prototype.valueOf.call(target));
    case ERROR_TAG:
      return target;
    case DATE_TAG:
      return new Ctor(target);
    case REGEXP_TAG:
      return regExpTypeHandle(target);
    case FUNC_TAG:
      return functionTypeHandle(target);
    default:
      return new Ctor(target);
  }
}

/**
 * 深拷贝
 * @param target {*}
 * @param valSet {WeakSet<Object | Function>}  记录已经拷贝过的对象，
 * @returns {*}
 */
function deepClone(target, valSet = new WeakSet()) {
  // 如果不是对象或函数的话，代表为原始类型，直接返回
  if (!isObject(target)) return target;

  // 获取对象类型
  const type = getType(target);

  // 如果是不可遍历状态，调用handleNotTraverse进行处理
  if (!CAN_TRAVERSE_TYPE.includes(type)) return handleNotTraverse(target, type);

  if (valSet.has(target)) return target; // 判断是否拷贝过此target

  valSet.add(target); // 记录当前target

  // 继承对象的原型，可以保证target原型不丢失
  const Ctor = target.constructor;
  const newTarget = new Ctor();

  switch (type) {
    // Map 和 WeakMap 类型
    case MAP_TAG || WEAK_MAP_TAG:
      target.forEach((val, key) => newTarget.set(deepClone(key, valSet), deepClone(val, valSet)));
      break;

    // Set 和 WeakSet 类型
    case SET_TAG || WEAK_SET_TAG:
      target.forEach((item) => newTarget.add(deepClone(item, valSet)));
      break;

    default:
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          newTarget[key] = deepClone(target[key], valSet);
        }
      }
      break;
  }

  return newTarget;
}

module.exports = deepClone;
