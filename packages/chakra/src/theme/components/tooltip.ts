import { StyleConfig, cssVar } from "@chakra-ui/react";
import { applyOpacity } from "../../utils";
import { colors } from "../foundation";

const $fgColor = cssVar("sf-tooltip-fg");
const $bgColor = cssVar("sf-tooltip-bg");
const $shadow = cssVar("sf-tooltip-shadow");
const $arrowBg = cssVar("popper-arrow-bg");

export const Tooltip: StyleConfig = {
  baseStyle({ theme }) {
    return {
      py: 2,
      px: 3,
      rounded: 2,
      fontSize: "12px",
      fontWeight: "medium",
      lineHeight: "18px",
      color: $fgColor.reference,
      bgColor: $bgColor.reference,
      boxShadow: $shadow.reference,

      [$fgColor.variable]: colors.neutral[100],
      [$bgColor.variable]: colors.neutral[900],
      [$arrowBg.variable]: $bgColor.reference,
      [$shadow.variable]: [
        "0px 12px 16px -4px " + applyOpacity(theme.colors.gray[900], 8),
        "0px 4px 6px -2px " + applyOpacity(theme.colors.gray[900], 3),
      ].join(),

      _dark: {
        [$fgColor.variable]: colors.gray[700],
        [$bgColor.variable]: colors.white,
        [$arrowBg.variable]: $bgColor.reference,

        border: "1px",
        borderColor: colors.gray[100],
      },
    };
  },
};
