import { Callable } from "../types";

export function isCallable(subject: unknown): subject is Callable<unknown> {
  return typeof subject === "function";
}

export function isString(subject: unknown): subject is string {
  return typeof subject === "string";
}

export function isNumber(subject: unknown): subject is number {
  return typeof subject === "number";
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
