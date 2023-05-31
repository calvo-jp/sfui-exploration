import { MultiStyleConfig } from "@chakra-ui/react";

const chakraIconClassname = ".chakra-icon";

export const Breadcrumb: MultiStyleConfig = {
  parts: ["container", "link", "list", "separator"],
  baseStyle: {
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
        color: "primary.900",
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
  },
};
