/*
 * [INFO]
 *
 * In the future we will separate HDS colors
 * as it is super tedious to deal with colors with different contrasts.
 * We will default to untitled ui's color,
 * but will give user an option to use HDS colors
 *
 */

import * as components from "./components";
import * as foundation from "./foundation";

export const theme = {
  ...foundation,
  ...components,
};

interface withSFTheme {
  useHDSColors?: boolean;
}

export function withSFTheme(config?: withSFTheme): Record<string, any>[] {
  return [theme];
}
