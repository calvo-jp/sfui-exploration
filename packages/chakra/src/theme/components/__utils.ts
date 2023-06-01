export function isHdsColorSchemeButNotNuetral<T extends string>(key?: T) {
  return (
    key &&
    [
      //
      "primary",
      "error",
      "success",
      "warning",
    ].includes(key)
  );
}

export function isHdsNeutralColorScheme<T extends string>(key?: T) {
  return key === "neutral";
}

export function isUntitledColorScheme<T extends string>(key?: T) {
  return !isHdsColorSchemeButNotNuetral(key) && !isHdsNeutralColorScheme(key);
}

type Dict = Record<string, any>;
type Key = string | number;

export function getThemeColor(
  theme: Dict,
  pallete: string,
  key: Key,
  fallback = "",
) {
  return theme.colors?.[pallete]?.[key] ?? fallback;
}
