type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer L}`
  ? `${F}${To}${ReplaceAll<L, From, To>}`
  : S;
