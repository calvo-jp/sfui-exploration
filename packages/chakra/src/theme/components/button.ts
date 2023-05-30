import { StyleConfig } from "@chakra-ui/react";

export const Button: StyleConfig = {
  baseStyle: {
    rounded: 1,
  },
  variants: {
    solid({ colorScheme }) {
      return {
        color: "neutral.100",
        fontWeight: "medium",
        transition: "all 300ms ease-in-out",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        bgColor: `${colorScheme}.700`,
        _hover: {
          bgColor: `${colorScheme}.700`,
        },
        _focus: {
          boxShadow: "none",
          bgColor: `${colorScheme}.800`,
        },
      };
    },
  },
  sizes: {
    sm: {
      height: 9,
      paddingY: 2,
      paddingX: 3.5,
      fontSize: "xs",
      lineHeight: "12px",
      letterSpacing: "0.02em",
    },
    md: {
      height: 10,
      paddingY: 2.5,
      paddingX: 4,
      fontSize: "sm",
      lineHeight: "14px",
      letterSpacing: "0.02em",
    },
    lg: {
      height: 11,
      paddingY: 2.5,
      paddingX: "18px",
      fontSize: "md",
      lineHeight: "24px",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "primary",
  },
};
