import { MultiStyleConfig } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { Input } from "./input";

export const Select: MultiStyleConfig = {
  parts: ["field", "icon"],
  baseStyle: {
    icon: {
      w: 5,
      h: 5,
    },
  },
  variants: {
    outline(context) {
      return {
        field: {
          ...runIfCallable(Input.variants?.outline, context)?.field,
        },
      };
    },
  },
  sizes: {
    sm: {
      field: {
        ...runIfCallable(Input.sizes?.sm)?.field,
      },
    },
    md: {
      field: {
        ...runIfCallable(Input.sizes?.md)?.field,
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
