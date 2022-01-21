type Chainable<T extends {} = {}> = {
  option<K extends string, V = unknown>(key: K, value: V): Chainable<T & { [P in K]: V }>;
  get(): T;
};
