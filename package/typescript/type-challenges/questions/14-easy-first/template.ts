// 通过 T extends [] 判断是否为空数组
type First<T extends any[]> = T extends [] ? never : T[0];
