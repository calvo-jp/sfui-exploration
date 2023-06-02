import { isCallable } from "./is";

export function runIfCallable<T, U>(
  valueOrCallback: T | ((...args: U[]) => T),
  ...args: U[]
): T {
  return isCallable(valueOrCallback)
    ? valueOrCallback(...args)
    : valueOrCallback;
}
