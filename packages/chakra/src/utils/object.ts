/**
 * @example
 * createObjectFromKeys(
 *    {
 *      prop1: "Aa",
 *      prop2: "Bb"
 *    },
 *    "key1",
 *    "key2"
 * )
 *
 * // output
 *
 * {
 *    key1: {
 *      prop1: "Aa",
 *      prop2: "Bb"
 *    },
 *    key2: {
 *      prop1: "Aa",
 *      prop2: "Bb",
 *    }
 * }
 */
export function assignCommonPropsToKeys<
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

export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  const copy = { ...obj };

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(copy, key)) {
      delete copy[key];
    }
  }

  return copy as Omit<T, K>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  const picked: Partial<Record<K, T[K]>> = {};

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      picked[key] = obj[key];
    }
  }

  return picked as Pick<T, K>;
}
