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
