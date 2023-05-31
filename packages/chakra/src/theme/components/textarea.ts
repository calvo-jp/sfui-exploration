import { StyleConfig } from "@chakra-ui/react";
import { runIfFn } from "../../utils";
import { Input } from "./input";

export const Textarea: StyleConfig = {
  variants: {
    outline(props) {
      return {
        ...runIfFn(Input.variants?.outline, props)?.field,
      };
    },
  },
  sizes: {
    sm: {
      ...runIfFn(Input.sizes?.sm)?.field,
    },
    md: {
      ...runIfFn(Input.sizes?.md)?.field,
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
