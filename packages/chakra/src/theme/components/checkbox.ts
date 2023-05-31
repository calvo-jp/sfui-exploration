import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { getThemeColor } from "./_utils";

const $shadow = cssVar("sf-checkbox-shadow");

export const Checkbox: MultiStyleConfig = {
  parts: ["control", "icon", "container", "label"],
  variants: {
    outline({ theme, colorScheme }) {
      return {
        control: {
          border: "1px",
          borderColor: "neutral.300",
          _hover: {
            bgColor: getThemeColor(theme, colorScheme, 500),
            borderColor: getThemeColor(theme, colorScheme, 700),
          },
          _focus: {
            borderColor: getThemeColor(theme, colorScheme, 500),
            boxShadow: $shadow.reference,
            _hover: {
              bgColor: getThemeColor(theme, colorScheme, 500),
              borderColor: getThemeColor(theme, colorScheme, 700),
            },
          },
          _checked: {
            color: getThemeColor(theme, colorScheme, 700),
            bgColor: getThemeColor(theme, colorScheme, 500),
            borderColor: getThemeColor(theme, colorScheme, 700),
            _hover: {
              bgColor: getThemeColor(theme, colorScheme, 500),
              borderColor: getThemeColor(theme, colorScheme, 700),
            },
            _focus: {
              borderColor: getThemeColor(theme, colorScheme, 700),
              boxShadow: $shadow.reference,
            },
          },
          [$shadow.variable]:
            "0px 0px 0px 4px " + getThemeColor(theme, colorScheme, 100),
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
    colorScheme: "primary",
  },
};
