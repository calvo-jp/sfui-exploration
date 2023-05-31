import { MultiStyleConfig } from "@chakra-ui/react";
import { getThemeColor } from "./_utils";

export const Progress: MultiStyleConfig = {
  parts: ["label", "filledTrack", "track"],
  baseStyle({ theme, colorScheme }) {
    return {
      track: {
        bg: "neutral.200",
        rounded: "4px",
      },
      filledTrack: {
        bg: getThemeColor(theme, colorScheme, 700),
        rounded: "4px",
      },
    };
  },
  sizes: {
    sm: { track: { h: 1 } },
    md: { track: { h: 2 } },
    lg: { track: { h: 3 } },
    xl: { track: { h: 4 } },
  },
  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
};
