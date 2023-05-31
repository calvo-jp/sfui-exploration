import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { lighten } from "../../utils";

const $bg = cssVar("popover-bg");
const $fg1 = cssVar("popover-fg");
const $fg2 = cssVar("popover-fg-secondary");
const $shadow = cssVar("popover-shadow");
const $arrowBg = cssVar("popper-arrow-bg");

export const Popover: MultiStyleConfig = {
  parts: [
    "content",
    "header",
    "body",
    "footer",
    "popper",
    "arrow",
    "closeButton",
  ],
  baseStyle({ theme }) {
    return {
      content: {
        p: 3,
        bg: $bg.reference,
        color: $fg1.reference,
        rounded: "8px",
        fontSize: "12px",
        fontWeight: "normal",
        lineHeight: "18px",
        boxShadow: $shadow.reference,

        [$bg.variable]: theme.colors.neutral[900],
        [$fg1.variable]: theme.colors.neutral[100],
        [$fg2.variable]: theme.colors.neutral[300],
        [$arrowBg.variable]: $bg.reference,
        [$shadow.variable]: [
          "0px 12px 16px -4px " + lighten(theme.colors.gray[900], 8),
          "0px 4px 6px -2px " + lighten(theme.colors.gray[900], 3),
        ].join(),

        _dark: {
          [$bg.variable]: theme.colors.white,
          [$fg1.variable]: theme.colors.neutral[700],
          [$fg2.variable]: theme.colors.neutral[600],
          [$arrowBg.variable]: $bg.reference,

          border: "1px",
          borderColor: theme.colors.gray[100],
        },
      },
      header: {
        p: 0,
        border: "none",
        fontWeight: "medium",
      },
      body: {
        p: 0,
        mt: 1,
        color: $fg2.reference,
        border: "none",
      },
      footer: {
        p: 0,
        mt: 1,
        color: $fg2.reference,
        border: "none",
      },
      arrow: {
        bg: $bg.variable,
        color: $fg1.variable,
      },
      closeButton: {
        w: "fit-content",
        h: "fit-content",
        p: 1,
        top: 1.5,
        right: 1.5,
        color: "neutral.700",
        rounded: "4px",
        _hover: {
          bg: "neutral.800",
          color: "neutral.500",
        },
        _dark: {
          color: "neutral.200",
          _hover: {
            bg: "neutral.100",
            color: "neutral.400",
          },
        },
      },
    };
  },
};
