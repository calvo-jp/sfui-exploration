import { MultiStyleConfig } from "@chakra-ui/react";
import { applyOpacity } from "../../utils";
import { getThemeColor } from "./_utils";

export const Slider: MultiStyleConfig = {
  parts: ["container", "track", "thumb", "filledTrack", "mark"],
  baseStyle({ theme, colorScheme }) {
    return {
      track: {
        h: "8px",
        bg: "neutral.200",
        rounded: "4px",
      },
      filledTrack: {
        bg: getThemeColor(theme, colorScheme, 700),
      },
      thumb: {
        w: "24px",
        h: "24px",
        bg: "white",
        border: "1.5px solid",
        borderColor: "primary.700",
        _focus: {
          boxShadow:
            "0px 0px 0px 3px " +
            applyOpacity(getThemeColor(theme, colorScheme, 100), 80),
        },
      },
    };
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
