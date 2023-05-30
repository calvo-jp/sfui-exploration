import { MultiStyleConfig } from "@chakra-ui/react";

export const Modal: MultiStyleConfig = {
  parts: [
    "header",
    "overlay",
    "dialogContainer",
    "dialog",
    "closeButton",
    "body",
    "footer",
  ],
  baseStyle: {
    overlay: {
      bgColor: "overlay",
    },
  },
  sizes: {},
};
