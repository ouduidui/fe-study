export type LengthOfString<S extends string, L extends unknown[] = []> = S extends `${infer F}${infer O}`
  ? LengthOfString<O, [...L, F]>
  : L['length'];
