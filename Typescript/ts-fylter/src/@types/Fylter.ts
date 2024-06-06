export interface FylterInterface<T> {
  getTable: () => Array<T>;
  append: (
    data: Array<T>,
    options: FylterDataOptionInterface
  ) => object;
  groupBy: <U extends string[]>(params: U) => object;
}

export interface FylterDataOptionInterface {
  name?: string;
  spread?: boolean;
}
