import { MultiStyleConfig } from "@chakra-ui/react";

export const Drawer: MultiStyleConfig = {
  parts: [
    "overlay",
    "dialogContainer",
    "dialog",
    "header",
    "closeButton",
    "footer",
    "body",
  ],
  baseStyle: {
    overlay: {
      bgColor: "overlay",
    },
    dialog: {
      p: 6,
    },
    body: {
      p: 0,
    },
    header: {
      p: 0,
    },
    footer: {
      p: 0,
    },
    closeButton: {
      p: 1.5,
      w: "fit-content",
      h: "fit-content",
      top: 3,
      right: 3,
      color: "neutral.600",
      _hover: {
        bg: "blackAlpha.100",
        color: "neutral.700",
      },
    },
  },
};
