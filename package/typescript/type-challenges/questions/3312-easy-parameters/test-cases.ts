import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

// @ts-ignore
const foo = (arg1: string, arg2: number): void => {};
// @ts-ignore
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
