import { MultiStyleConfig } from "@chakra-ui/react";

export const Slider: MultiStyleConfig = {
  parts: ["container", "track", "thumb", "filledTrack", "mark"],
  baseStyle: {
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
    },
  },
};
