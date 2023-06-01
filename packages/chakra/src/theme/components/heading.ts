import { StyleConfig } from "@chakra-ui/react";
import { Text } from "./text";

export const Heading: StyleConfig = {
  baseStyle: {
    fontWeight: "medium",
  },
  sizes: Text.sizes,
  defaultProps: {
    size: "header-6",
  },
};
