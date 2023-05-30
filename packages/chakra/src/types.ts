export type Pretty<T> = { [K in keyof T]: T[K] } & {};
export type Merge<P, T> = Pretty<Omit<P, keyof T> & T>;
export type Nullable<T> = T | null;
export type Maybe<T> = Nullable<T> | undefined;
export type Awaitable<T> = T | Promise<T>;
export type Callable<Return, Args extends unknown[] = never[]> = (
  ...args: Args
) => Return;
export type WithoutChildren<T> = Omit<T, "children">;
