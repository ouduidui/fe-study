type Last<T extends unknown[]> = T extends [infer Head, ...infer Tail] ? (T extends [Head] ? Head : Last<Tail>) : never;
