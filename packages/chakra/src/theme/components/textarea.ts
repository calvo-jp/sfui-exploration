import { StyleConfig } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { Input } from "./input";

export const Textarea: StyleConfig = {
  variants: {
    outline(props) {
      return {
        ...runIfCallable(Input.variants?.outline, props)?.field,
      };
    },
  },
  sizes: {
    sm: {
      ...runIfCallable(Input.sizes?.sm)?.field,
    },
    md: {
      ...runIfCallable(Input.sizes?.md)?.field,
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
