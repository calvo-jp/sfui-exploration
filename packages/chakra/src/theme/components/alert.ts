import { AlertStatus, MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { getThemeColor } from "./__utils";

const $subtleContainerBg = cssVar("alert-container-bg");
const $subtleContainerBorder = cssVar("alert-container-border");
const $subtleIconFg = cssVar("alert-icon-fg");
const $subtleTitleFg = cssVar("alert-title-fg");
const $subtleDescFg = cssVar("alert-desc-fg");

export const Alert: MultiStyleConfig = {
  parts: ["container", "title", "description", "icon", "spinner"],
  variants: {
    subtle({ theme, status }) {
      const colorScheme = statusToColorScheme(status);

      return {
        container: {
          [$subtleContainerBg.variable]: getThemeColor(theme, colorScheme, 500),
          [$subtleContainerBorder.variable]: getThemeColor(
            theme,
            colorScheme,
            600,
          ),
          [$subtleIconFg.variable]: getThemeColor(theme, colorScheme, 900),
          [$subtleTitleFg.variable]: getThemeColor(theme, colorScheme, 900),
          [$subtleDescFg.variable]: getThemeColor(theme, colorScheme, 700),

          ...(colorScheme === "gray" && {
            [$subtleContainerBg.variable]: getThemeColor(theme, "gray", 50),
            [$subtleContainerBorder.variable]: getThemeColor(
              theme,
              "gray",
              300,
            ),
            [$subtleIconFg.variable]: getThemeColor(theme, "neutral", 900),
            [$subtleTitleFg.variable]: getThemeColor(theme, "neutral", 800),
            [$subtleDescFg.variable]: getThemeColor(theme, "neutral", 600),
          }),

          bg: $subtleContainerBg.reference,
          border: "px",
          borderColor: $subtleContainerBorder.reference,
          rounded: "8px",
        },
        icon: {
          color: $subtleIconFg.reference,
        },
        title: {
          color: $subtleTitleFg.reference,
          fontSize: "14px",
          fontWeight: "medium",
          lineHeight: "20px",
        },
        description: {
          color: $subtleDescFg.reference,
          fontSize: "14px",
          lineHeight: "20px",
        },
        spinner: {
          "& *": {
            color: $subtleIconFg.reference,
          },
        },
      };
    },
  },
  defaultProps: {
    size: "md",
    variant: "subtle",
  },
};

/* prettier-ignore */
function statusToColorScheme(status?: AlertStatus) {
  switch (status) {
    case "success": return "success";
    case "warning": return "warning";
    case "error": return "error";
    case "loading": return "gray";
    default: return "primary";
  }
}
