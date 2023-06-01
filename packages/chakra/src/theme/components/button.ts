import { StyleConfig, cssVar } from "@chakra-ui/react";
import { applyOpacity } from "../../utils";
import {
  getThemeColor,
  isHdsColorSchemeButNotNuetral,
  isHdsNeutralColorScheme,
  isUntitledColorScheme,
} from "./_utils";

const $outlineBg = cssVar("sf-button-bg");
const $outlineFg = cssVar("sf-button-fg");
const $outlineBorder = cssVar("sf-button-border");
const $outlineShadow = cssVar("sf-button-shadow");
const $outlineBgHover = cssVar("sf-button-bg--hover");
const $outlineFgHover = cssVar("sf-button-fg--hover");
const $outlineFgFocus = cssVar("sf-button-fg--focus");
const $outlineBorderFocus = cssVar("sf-button-border--focus");
const $outlineShadowFocus = cssVar("sf-button-shadow--focus");

export const Button: StyleConfig = {
  baseStyle: {
    rounded: 1,
  },
  variants: {
    solid({ theme, colorScheme }) {
      return {
        color: "neutral.100",
        transition: "all 300ms ease-in-out",
        boxShadow: "0px 1px 2px " + applyOpacity(theme.colors.gray[900], 5),
        bgColor: `${colorScheme}.700`,
        _hover: {
          bgColor: `${colorScheme}.900`,
        },
        _focus: {
          boxShadow: [
            "0px 1px 2px " + applyOpacity(theme.colors.gray[900], 5),
            "0px 0px 0px 4px " + getThemeColor(theme, colorScheme, 100),
          ].join(),
        },
        _disabled: {
          bgColor: `${colorScheme}.500`,
          opacity: 1,
        },
      };
    },
    outline({ theme, colorScheme }) {
      return {
        ...(isHdsColorSchemeButNotNuetral(colorScheme) && {
          [$outlineBg.variable]: "white",
          [$outlineFg.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineBorder.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineShadow.variable]:
            "0px 1px 2px " + applyOpacity(theme.colors.gray[900], 5),
          [$outlineBgHover.variable]: getThemeColor(theme, colorScheme, 500),
          [$outlineFgHover.variable]: getThemeColor(theme, colorScheme, 900),
          [$outlineFgFocus.variable]: getThemeColor(theme, colorScheme, 900),
          [$outlineBorderFocus.variable]: getThemeColor(
            theme,
            colorScheme,
            700,
          ),
          [$outlineShadowFocus.variable]: [
            "0px 1px 2px " +
              applyOpacity(getThemeColor(theme, colorScheme, 900), 5),
            "0px 0px 0px 4px " + getThemeColor(theme, colorScheme, 100),
          ].join(),
        }),

        ...(isHdsNeutralColorScheme(colorScheme) && {
          [$outlineBg.variable]: "white",
          [$outlineFg.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineBorder.variable]: getThemeColor(theme, colorScheme, 300),
          [$outlineShadow.variable]:
            "0px 1px 2px " + applyOpacity(theme.colors.gray[900], 5),
          [$outlineBgHover.variable]: getThemeColor(theme, colorScheme, 100),
          [$outlineFgHover.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineFgFocus.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineBorderFocus.variable]: getThemeColor(
            theme,
            colorScheme,
            300,
          ),
          [$outlineShadowFocus.variable]: [
            "0px 1px 2px " +
              applyOpacity(getThemeColor(theme, colorScheme, 900), 5),
            "0px 0px 0px 4px " + getThemeColor(theme, colorScheme, 100),
          ].join(),
        }),

        ...(isUntitledColorScheme(colorScheme) && {
          [$outlineBg.variable]: "white",
          [$outlineFg.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineBorder.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineShadow.variable]:
            "0px 1px 2px " + applyOpacity(theme.colors.gray[900], 5),
          [$outlineBgHover.variable]: getThemeColor(theme, colorScheme, 50),
          [$outlineFgHover.variable]: getThemeColor(theme, colorScheme, 700),
          [$outlineFgFocus.variable]: getThemeColor(theme, colorScheme, 600),
          [$outlineBorderFocus.variable]: getThemeColor(
            theme,
            colorScheme,
            600,
          ),
          [$outlineShadowFocus.variable]: [
            "0px 1px 2px " +
              applyOpacity(getThemeColor(theme, colorScheme, 900), 5),
            "0px 0px 0px 4px " + getThemeColor(theme, colorScheme, 50),
          ].join(),
        }),

        bg: $outlineBg.reference,
        color: $outlineFg.reference,
        border: "1px",
        outline: "none",
        boxShadow: $outlineShadow.reference,
        borderColor: $outlineBorder.reference,

        _hover: {
          bg: $outlineBgHover.reference,
          color: $outlineFgHover.reference,
        },

        _focus: {
          color: $outlineFgFocus.reference,
          boxShadow: $outlineShadowFocus.reference,
          borderColor: $outlineBorderFocus.reference,
        },

        _active: {
          bg: "white",
        },
      };
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
