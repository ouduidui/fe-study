type Pop<T extends unknown[]> = T extends [...infer L, unknown] ? L : never;
