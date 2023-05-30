import { MultiStyleConfig } from "@chakra-ui/react";

export const Menu: MultiStyleConfig = {
  parts: ["button", "list", "item", "groupTitle", "command", "divider"],
  baseStyle: {
    list: {
      padding: "0px",
      border: "1px",
      borderColor: "gray.100",
      rounded: "8px",
      overflow: "hidden",
      minWidth: "175px",
      boxShadow:
        "0px 12px 16px -4px rgba(16, 24, 40, 0.08)," +
        "0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    },
    item: {
      gap: "12px",
      fontSize: "14px",
      lineHeight: "14px",
      letterSpacing: "0.02em",
      paddingY: "12px",
      paddingX: "16px",
      minWidth: "full",
      color: "neutral.900",
      _hover: {
        bgColor: "neutral.100",
      },
      _focus: {
        bgColor: "neutral.100",
      },

      ".chakra-menu__icon": {
        width: 4,
        height: 4,
        color: "gray.700",
      },
      ".chakra-menu__icon-wrapper": {
        margin: "0px",
      },
    },
    command: {
      color: "neutral.700",
      fontSize: "12px",
      lineHeight: "12px",
      letterSpacing: "0.02em",
    },
    divider: {
      borderColor: "neutral.200",
      margin: "0px",
    },
  },
};
