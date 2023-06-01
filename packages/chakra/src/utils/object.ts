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
export function assignPropsToKeys<
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
