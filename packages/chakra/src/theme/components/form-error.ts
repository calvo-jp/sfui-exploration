import { MultiStyleConfig } from "@chakra-ui/react";

/**
 * FormErrorMessage
 */
export const FormError: MultiStyleConfig = {
  parts: ["text", "icon"],
  baseStyle: {
    text: {
      mt: 1.5,
      color: "error.700",
      fontSize: "sm",
      lineHeight: "14px",
      letterSpacing: "0.02em",
    },
  },
};
