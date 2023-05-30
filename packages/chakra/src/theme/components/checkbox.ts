import { MultiStyleConfig } from "@chakra-ui/react";

export const Checkbox: MultiStyleConfig = {
  parts: ["control", "icon", "container", "label"],
  baseStyle() {
    return {};
  },
  variants: {
    outline() {
      return {
        control: {
          border: "1px",
          borderColor: "neutral.300",
          _hover: {
            bgColor: "primary.500",
            borderColor: "primary.700",
          },
          _focus: {
            borderColor: "primary.500",
            boxShadow: "0px 0px 0px 4px #F4EBFF",
            _hover: {
              bgColor: "primary.500",
              borderColor: "primary.700",
            },
          },
          _checked: {
            color: "primary.700",
            bgColor: "primary.500",
            borderColor: "primary.700",
            _hover: {
              bgColor: "primary.500",
              borderColor: "primary.700",
            },
            _focus: {
              borderColor: "primary.700",
              boxShadow: "0px 0px 0px 4px #F4EBFF",
            },
          },
        },
      };
    },
  },
  sizes: {
    sm: {
      control: {
        w: 4,
        h: 4,
        rounded: "4px",
      },
    },
    md: {
      control: {
        w: 5,
        h: 5,
        rounded: "6px",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
