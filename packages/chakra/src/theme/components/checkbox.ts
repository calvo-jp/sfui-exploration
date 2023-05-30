import { MultiStyleConfig } from "@chakra-ui/react";

export const Checkbox: MultiStyleConfig = {
  parts: ["control", "icon", "container", "label"],
  baseStyle({ colorScheme }) {
    return {
      control: {
        _hover: {},
        _checked: {
          bgColor: `${colorScheme}.600`,
          borderColor: `${colorScheme}.600`,
          _hover: {
            bgColor: `${colorScheme}.700`,
            borderColor: `${colorScheme}.700`,
          },
        },
      },
    };
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
