import { StyleConfig, cssVar } from "@chakra-ui/react";
import { colors } from "../colors";

const $fgColor = cssVar("tooltip-fg");
const $bgColor = cssVar("tooltip-bg");
const $arrowBg = cssVar("popper-arrow-bg");

export const Tooltip: StyleConfig = {
  baseStyle: {
    py: 2,
    px: 3,
    rounded: 2,
    fontSize: "12px",
    fontWeight: "medium",
    lineHeight: "18px",
    color: $fgColor.reference,
    bgColor: $bgColor.reference,
    boxShadow:
      "0px 12px 16px -4px rgba(16, 24, 40, 0.08)," +
      "0px 4px 6px -2px rgba(16, 24, 40, 0.03)",

    [$fgColor.variable]: colors.neutral[100],
    [$bgColor.variable]: colors.neutral[900],
    [$arrowBg.variable]: $bgColor.reference,

    _dark: {
      [$fgColor.variable]: colors.gray[700],
      [$bgColor.variable]: colors.white,
      [$arrowBg.variable]: $bgColor.reference,

      border: "1px",
      borderColor: colors.gray[100],
    },
  },
};
