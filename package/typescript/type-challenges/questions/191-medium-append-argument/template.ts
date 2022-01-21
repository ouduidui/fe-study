type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;
