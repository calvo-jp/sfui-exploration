import { StyleConfig } from "@chakra-ui/react";
import { lighten } from "../../utils";

export const Button: StyleConfig = {
  baseStyle: {
    rounded: 1,
  },
  variants: {
    solid({ theme, colorScheme }) {
      return {
        color: "neutral.100",
        transition: "all 300ms ease-in-out",
        boxShadow: "0px 1px 2px " + lighten(theme.colors.gray[900], 5),
        bgColor: `${colorScheme}.700`,
        _hover: {
          bgColor: `${colorScheme}.900`,
        },
        _focus: {
          boxShadow: [
            "0px 1px 2px " + lighten(theme.colors.gray[900], 5),
            "0px 0px 0px 4px " + theme.colors[colorScheme][100],
          ].join(),
        },
        _disabled: {
          bgColor: `${colorScheme}.500`,
          opacity: 1,
        },
      };
    },
    outline() {
      return {};
    },
    subtle() {
      return {};
    },
    ghost() {
      return {};
    },
    link() {
      return {};
    },
  },
  sizes: {
    sm: {
      h: 9,
      py: 2,
      px: 3.5,
      fontSize: "12px",
      fontWeight: "medium",
      lineHeight: "12px",
      letterSpacing: "0.02em",
    },
    md: {
      h: 10,
      py: 2.5,
      px: 4,
      fontSize: "14px",
      fontWeight: "semibold",
      lineHeight: "14px",
      letterSpacing: "0.02em",
    },
    lg: {
      h: 11,
      py: 2.5,
      px: 4.5,
      fontSize: "18px",
      fontWeight: "semibold",
      lineHeight: "24px",
    },
    xl: {
      h: 12,
      py: 3,
      px: 5,
      fontSize: "20px",
      fontWeight: "semibold",
      lineHeight: "20px",
    },
    "2xl": {
      h: 13,
      py: 4,
      px: 7,
      fontSize: "18px",
      fontWeight: "semibold",
      lineHeight: "24px",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "primary",
  },
};
