import { MultiStyleConfig } from "@chakra-ui/react";
import { getThemeColor } from "./__utils";

export const Breadcrumb: MultiStyleConfig = {
  parts: ["container", "link", "list", "separator"],
  baseStyle({ theme, colorScheme }) {
    return {
      list: {
        fontSize: "sm",
        lineHeight: "14px",
      },
      link: {
        color: "neutral.600",
        letterSpacing: "0.02em",
        textDecoration: "none",
        _hover: {
          color: "neutral.800",
        },
        _activeLink: {
          color: getThemeColor(theme, colorScheme, 900),
        },
      },
      separator: {
        mx: 3.5,
        color: "neutral.300",
        [chakraIconClassname]: {
          w: 5,
          h: 5,
        },
      },
    };
  },
  defaultProps: {
    colorScheme: "primary",
  },
};

const chakraIconClassname = ".chakra-icon";
