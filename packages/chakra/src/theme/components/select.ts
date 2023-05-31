import { MultiStyleConfig } from "@chakra-ui/react";
import { runIfFn } from "../../utils";
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
          ...runIfFn(Input.variants?.outline, context)?.field,
        },
      };
    },
  },
  sizes: {
    sm: {
      field: {
        ...runIfFn(Input.sizes?.sm)?.field,
      },
    },
    md: {
      field: {
        ...runIfFn(Input.sizes?.md)?.field,
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
