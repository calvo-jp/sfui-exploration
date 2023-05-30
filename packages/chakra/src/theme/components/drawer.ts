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
      bgColor: "rgba(52, 64, 84, 0.7)",
    },
  },
};
