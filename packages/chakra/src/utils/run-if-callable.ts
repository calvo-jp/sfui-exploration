import { isCallable } from "./types";

export function runIfCallable<T, U>(
  valueOrCallback: T | ((...args: U[]) => T),
  ...args: U[]
): T {
  return isCallable(valueOrCallback)
    ? valueOrCallback(...args)
    : valueOrCallback;
}
