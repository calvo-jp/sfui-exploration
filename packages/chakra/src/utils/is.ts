import { Callable } from "../types";

export function isCallable(subject: unknown): subject is Callable<unknown> {
  return typeof subject === "function";
}

export function isString(subject: unknown): subject is string {
  return typeof subject === "string";
}

export function isArray<T = any>(subject: unknown): subject is Array<T> {
  return Array.isArray(subject);
}

export function isNumber(subject: unknown): subject is number {
  return typeof subject === "number";
}

export function isBoolean(subject: unknown): subject is boolean {
  return typeof subject === "boolean";
}

export function isUndefined(subject: unknown): subject is undefined {
  return subject === undefined;
}

export function isNull(subject: unknown): subject is null {
  return subject === null;
}

type Nil = undefined | null;

/**
 * Checks if value is null or undefined
 */
export function isNil(subject: unknown): subject is Nil {
  return isUndefined(subject) || isNull(subject);
}

export function isPlainObject(
  subject: unknown,
): subject is Record<string, any> {
  const TAG = "[object Object]";

  return (
    !!subject &&
    Object.prototype.toString.call(subject) === TAG &&
    Object(subject) === subject
  );
}
