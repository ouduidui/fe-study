type LookUp<U, T extends string> = U extends { type: string } ? (T extends U['type'] ? U : never) : never;
