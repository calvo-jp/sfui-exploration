import { MultiStyleConfig } from "@chakra-ui/react";
import { assignCommonPropsToKeys, runIfCallable } from "../../utils";
import { Input } from "./input";

export const Select: MultiStyleConfig = {
  parts: [
    "field",
    "icon",
    /* custom select */
    "trigger",
    "options",
    "option",
  ],
  baseStyle: {
    icon: {
      w: 5,
      h: 5,
    },
    trigger: {
      w: "full",
      display: "flex",
      alignItems: "center",
      flexWrap: "noWrap",
      textAlign: "left",
      whiteSpace: "nowrap",
      outline: "none",
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
      cursor: "pointer",
      fontSize: "14px",
      lineHeight: "20px",
      outline: "none",
      _selected: {
        bg: "neutral.100",
      },
    },
  },
  variants: {
    outline(context) {
      return {
        field: {
          ...runIfCallable(Input.variants?.outline, context)?.field,
        },
        trigger: {
          ...runIfCallable(Input.variants?.outline, context)?.field,
          _placeholder: {},
        },
      };
    },
  },
  sizes: {
    sm: {
      ...assignCommonPropsToKeys(
        runIfCallable(Input.sizes?.sm)?.field ?? {},
        "field",
        "trigger",
      ),
      option: {
        px: 3,
      },
    },
    md: {
      ...assignCommonPropsToKeys(
        runIfCallable(Input.sizes?.md)?.field ?? {},
        "field",
        "trigger",
      ),
      option: {
        px: 3.5,
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
