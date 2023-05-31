import { ReactNode } from "react";
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

/**
 *
 * Add opacity to rgba or hex color
 *
 * @param color hex or rgba color
 * @param opacity the alpha value. 0 is the smallest and 100 is the highest
 *
 */
export function lighten(color: string, opacity: number) {
  color = color.trim().toLowerCase();

  if (color.startsWith("#")) {
    color = color.slice(1);

    if (color.length === 3) {
      color = color.replace(/./g, "$&$&");
    }

    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);
    const alpha = opacity / 100;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  if (color.startsWith("rgb(")) {
    const rgb = color.substring(4, color.length - 1).split(",");

    const red = parseInt(rgb[0]);
    const green = parseInt(rgb[1]);
    const blue = parseInt(rgb[2]);
    const alpha = opacity / 100;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return color;
}

export function getJsxTextContent(element: ReactNode): string {
  try {
    /* null, undefined, boolean */
    if (!element || typeof element === "boolean") return "";

    /* string, number */
    if (typeof element === "string" || typeof element === "number")
      return element.toString();

    /* ignore fragment */
    const children = "props" in element ? element.props.children : "";

    if (Array.isArray(children))
      return children.map(getJsxTextContent).join("").trim();
  } catch {
    /* TODO: log? */
  }

  return "";
}

/* TODO: Needs a better name */
export function createObjectFromKeys<
  T extends Record<string, any>,
  K extends string,
>(props: T, ...keys: K[]) {
  const assigned = keys.reduce<Partial<Record<K, T>>>((o, key) => {
    return {
      ...o,
      [key]: props,
    };
  }, {});

  return assigned as Record<K, T>;
}
