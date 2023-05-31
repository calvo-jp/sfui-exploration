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

export function getThemeColor(
  theme: Record<string, any>,
  pallete: string,
  key: string | number,
  fallback = "",
) {
  return theme.colors?.[pallete]?.[key] ?? fallback;
}
