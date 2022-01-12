function Singleton(FuncClass) {
  let _instance = null;
  // 使用 Proxy 来拦截构建示例
  return new Proxy(FuncClass, {
    /**
     * @param target 对象
     * @param args 参数数组
     */
    construct(target, args) {
      return _instance || (_instance = Reflect.construct(FuncClass, args));
    }
  });
}

module.exports = Singleton;
