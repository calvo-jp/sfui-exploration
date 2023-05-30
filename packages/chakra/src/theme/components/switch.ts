import { MultiStyleConfig, calc, cssVar } from "@chakra-ui/react";

const $width = cssVar("switch-track-width");
const $height = cssVar("switch-track-height");
const $diff = cssVar("switch-track-diff");
const diffValue = calc.subtract($width, $height);
const $translateX = cssVar("switch-thumb-x");

export const Switch: MultiStyleConfig = {
  parts: ["container", "thumb", "track"],
  baseStyle({ theme }) {
    return {
      container: {
        [$diff.variable]: diffValue,
        [$translateX.variable]: $diff.reference,
      },
      track: {
        padding: 0.5,
        width: [$width.reference],
        height: [$height.reference],
        transition:
          "background-color 300ms ease-in-out, box-shadow 300ms ease-in-out",

        _light: {
          bgColor: "neutral.200",
          _hover: {
            bgColor: "neutral.100",
          },
          _focus: {
            bgColor: "gray.50",
            boxShadow: "0px 0px 0px 4px " + theme.colors.primary[100],
          },
          _checked: {
            bgColor: "primary.700",
            _hover: {
              bgColor: "primary.900",
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
        _dark: {
          bgColor: "primary.50",
          _hover: {
            bgColor: "primary.100",
          },
          _focus: {
            boxShadow: "0px 0px 0px 4px " + theme.colors.primary[100],
          },
          _checked: {
            bgColor: "primary.200",
            _hover: {
              bgColor: "primary.300",
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
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
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
    colorScheme: "dark",
  },
};
