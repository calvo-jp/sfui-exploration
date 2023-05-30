import { MultiStyleConfig } from "@chakra-ui/react";

export const Menu: MultiStyleConfig = {
  parts: ["button", "list", "item", "groupTitle", "command", "divider"],
  baseStyle: {
    list: {
      p: "0px",
      minW: "175px",
      border: "1px",
      borderColor: "Gray.100",
      rounded: 2,
      overflow: "hidden",
      boxShadow:
        "0px 12px 16px -4px rgba(16, 24, 40, 0.08)," +
        "0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    },
    item: {
      px: 4,
      py: 3,
      gap: 3,
      minW: "full",
      color: "neutral.900",
      fontSize: "sm",
      lineHeight: 3.5,
      letterSpacing: "0.02em",
      _hover: {
        bgColor: "neutral.100",
      },
      _focus: {
        bgColor: "neutral.100",
      },

      /* classnames for icon and it's wrapper can be found here -> https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/menu/src/menu-icon.tsx
       */
      ".chakra-menu__icon-wrapper": {
        m: 0,
      },
      ".chakra-menu__icon": {
        w: 4,
        h: 4,
        color: "Gray.700",
      },
    },
    command: {
      color: "neutral.700",
      fontSize: "xs",
      lineHeight: 3,
      letterSpacing: "0.02em",
    },
    divider: {
      m: 0,
      borderColor: "neutral.200",
    },
  },
};
