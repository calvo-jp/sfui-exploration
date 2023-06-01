import { StyleConfig } from "@chakra-ui/react";
import { getThemeColor } from "./__utils";

export const Badge: StyleConfig = {
  baseStyle() {
    return {
      rounded: "16px",
      fontSize: "14px",
      fontWeight: "normal",
      lineHeight: "14px",
      letterSpacing: "0.02em",
      textTransform: "none",
    };
  },
  variants: {
    subtle({ theme, colorScheme }) {
      return {
        color: getThemeColor(theme, colorScheme, 700),
        bgColor: getThemeColor(theme, colorScheme, 50),
      };
    },
  },
  sizes: {
    sm: {
      py: 0.5,
      px: 2,
    },
    md: {
      py: 0.5,
      px: 2.5,
    },
    lg: {
      py: 1,
      px: 3,
    },
  },
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "primary",
  },
};
