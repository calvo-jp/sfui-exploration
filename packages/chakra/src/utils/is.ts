import { Callable } from "../types";

export function isFunction(subject: unknown): subject is Callable<unknown> {
  return typeof subject === "function";
}

export function isObject(subject: unknown): subject is Record<string, any> {
  return true;
}
