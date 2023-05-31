import { MultiStyleConfig } from "@chakra-ui/react";
import { lighten } from "../../utils";
import { colors } from "../colors";

console.log(lighten(colors.primary[100], 50));

export const Slider: MultiStyleConfig = {
  parts: ["container", "track", "thumb", "filledTrack", "mark"],
  baseStyle({ theme }) {
    return {
      track: {
        h: "8px",
        bg: "neutral.200",
        rounded: "4px",
      },
      filledTrack: {
        bg: "primary.700",
      },
      thumb: {
        w: "24px",
        h: "24px",
        bg: "white",
        border: "1.5px solid",
        borderColor: "primary.700",
        _focus: {
          boxShadow:
            "0px 0px 0px 3px " + lighten(theme.colors.primary[100], 80),
        },
      },
    };
  },
};
