type Permutation<T, U = T> = [U] extends [never] ? [] : T extends never ? [] : [T, ...Permutation<Exclude<U, T>>];
