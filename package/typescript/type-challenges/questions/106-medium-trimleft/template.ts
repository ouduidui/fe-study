type Blank = ' ' | '\n\t' | '\t';
type TrimLeft<S extends string> = S extends `${Blank}${infer R}` ? TrimLeft<R> : S;
