type TupleToObject<T extends readonly string[] | readonly number[] | readonly symbol[]> = {
  [P in T[number]]: P;
};
