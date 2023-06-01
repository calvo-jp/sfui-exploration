import { StyleConfig } from "@chakra-ui/react";
import { getThemeColor } from "./__utils";

export const Spinner: StyleConfig = {
  baseStyle({ theme, colorScheme }) {
    return {
      color: getThemeColor(theme, colorScheme, 700),
    };
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
