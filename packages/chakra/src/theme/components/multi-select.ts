import { MultiStyleConfig } from "@chakra-ui/react";
import { applyOpacity } from "../../utils";
import { colors } from "../foundation";

export const MultiSelect: MultiStyleConfig = {
  parts: [
    "control",
    "input",
    "arrow",
    "menu",
    "menuitem",
    "tag",
    "taglabel",
    "tagclose",
  ],
  baseStyle({ colorScheme }) {
    return {
      container: {
        gap: "6px",
        display: "flex",
        flexWrap: "wrap",
        border: "1px",
        borderColor: "neutral.200",
        rounded: "4px",
        paddingX: "14px",
        paddingY: "10px",
        minHeight: "48px",
        boxShadow: "0px 1px 2px " + applyOpacity(colors.gray[800], 5),

        _hover: {
          borderColor: "neutral.300",
        },

        _focusWithin: {
          borderColor: `${colorScheme}.700`,
        },

        _expanded: {
          borderColor: `${colorScheme}.700`,
        },

        "&[data-invalid]": {
          borderColor: "error.700",
        },
      },
      input: {
        outline: "none",
        _placeholder: {
          color: "neutral.500",
        },
      },
      options: {
        bg: "white",
        outline: "none",
        border: "1px",
        borderColor: "neutral.200",
        rounded: "4px",
        overflow: "hidden",
      },
      option: {
        py: 1.5,
        px: 3.5,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        lineHeight: "20px",
        outline: "none",
        _selected: {
          bg: "neutral.100",
        },
      },
    };
  },
  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
};
