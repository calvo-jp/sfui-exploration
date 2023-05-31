import { MultiStyleConfig, calc, cssVar } from "@chakra-ui/react";
import { lighten } from "../../utils";
import { colors } from "../colors";
import { getThemeColor } from "./_utils";

const $width = cssVar("switch-track-width");
const $height = cssVar("switch-track-height");
const $shadow = cssVar("switch-track-shadow");
const $diff = cssVar("switch-track-diff");
const diffValue = calc.subtract($width, $height);
const $translateX = cssVar("switch-thumb-x");

export const Switch: MultiStyleConfig = {
  parts: ["container", "thumb", "track"],
  baseStyle({ theme, colorScheme }) {
    return {
      container: {
        [$diff.variable]: diffValue,
        [$translateX.variable]: $diff.reference,
        [$shadow.variable]: "0px 0px 0px 4px " + theme.colors.primary[100],
      },
      track: {
        padding: 0.5,
        width: [$width.reference],
        height: [$height.reference],
        transition:
          "background-color 300ms ease-in-out, box-shadow 300ms ease-in-out",

        bgColor: "neutral.200",
        _hover: {
          bgColor: "neutral.100",
        },
        _focus: {
          bgColor: "gray.50",
          boxShadow: $shadow.reference,
        },
        _checked: {
          bgColor: getThemeColor(theme, colorScheme, 700),
          _hover: {
            bgColor: getThemeColor(theme, colorScheme, 900),
          },
        },
        _disabled: {
          opacity: 1,
          bgColor: "neutral.200",
          _hover: {
            bgColor: "neutral.200",
          },
        },

        _dark: {
          bgColor: getThemeColor(theme, colorScheme, 50),
          _hover: {
            bgColor: getThemeColor(theme, colorScheme, 100),
          },
          _focus: {
            boxShadow: $shadow.reference,
          },
          _checked: {
            bgColor: getThemeColor(theme, colorScheme, 200),
            _hover: {
              bgColor: getThemeColor(theme, colorScheme, 300),
            },
          },
          _disabled: {
            opacity: 1,
            bgColor: "neutral.200",
            _hover: {
              bgColor: "neutral.200",
            },
          },
        },
      },
      thumb: {
        width: [$height.reference],
        height: [$height.reference],
        bgColor: "white",
        transition: "all 300ms ease-in-out",
        boxShadow: [
          "0px 1px 3px " + lighten(colors.gray[900], 10),
          +"0px 1px 2px " + lighten(colors.gray[900], 6),
        ].join(),
        _checked: {
          transform: `translateX(${$translateX.reference})`,
        },
      },
    };
  },
  sizes: {
    sm: {
      container: {
        [$width.variable]: "36px",
        [$height.variable]: "20px",
      },
    },
    md: {
      container: {
        [$width.variable]: "44px",
        [$height.variable]: "24px",
      },
    },
  },
  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
};
