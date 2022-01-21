export type Capitalize<S extends string> = S extends `${infer F}${infer O}` ? `${Uppercase<F>}${O}` : '';
