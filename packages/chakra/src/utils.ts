import { Callable } from "./types";

export function arrayChunk<T extends Array<unknown>>(array: T, size: number) {
  const chunks: T[number][][] = [];
  const copy = [...array];

  const len = copy.length;
  const max = Math.ceil(len / size);
  let idx = 0;

  for (; idx < max; idx++) {
    chunks.push(copy.splice(0, size));
  }

  return chunks;
}

export function invariant<T>(condition: T, message = ""): asserts condition {
  const prefix = "Invariant violation";
  const delimiter = message ? ":" : "";

  if (!condition) throw new Error(`${prefix}${delimiter}${message}`);
}

export const isFunction = (subject: unknown): subject is Callable<unknown> =>
  typeof subject === "function";

export function runIfFn<T, U>(
  valueOrFn: T | ((...args: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export const noop = (..._args: any): any => undefined;
