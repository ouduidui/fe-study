type Trim<S extends string> = S extends `${Blank}${infer V}` | `${infer V}${Blank}` | `${Blank}${infer V}${Blank}`
  ? Trim<V>
  : S;
