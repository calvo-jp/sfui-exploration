import { MultiStyleConfig } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { Input } from "./input";

export const Combobox: MultiStyleConfig = {
  parts: ["control", "input", "arrow", "options", "option"],
  baseStyle(context) {
    return {
      control: {
        pos: "relative",
      },
      input: {
        w: "full",
        flexGrow: 1,
        ...runIfCallable(Input.baseStyle, context)?.field,
      },
      arrow: {
        pos: "absolute",
        top: "50%",
        transform: "translate(0,-50%)",
        transition: "transform 300ms ease-in-out",
        _expanded: {
          transform: "translate(0,-50%) rotate(180deg)",
        },

        "& .combobox-arrow-icon": {
          w: 5,
          h: 5,
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
  variants: {
    outline(context) {
      return {
        input: {
          ...runIfCallable(Input.variants?.outline, context)?.field,
        },
      };
    },
  },
  sizes: {
    md: {
      arrow: {
        right: 3,
      },
      input: {
        ...runIfCallable(Input.sizes?.md)?.field,
        pr: 3 + 5 /* arrow icon width */ + 1 /* allowance */,
      },
      option: {
        px: 3,
      },
    },
    lg: {
      input: {
        ...runIfCallable(Input.sizes?.md)?.field,
        pr: 3.5 + 5 /* arrow icon width */ + 1 /* allowance */,
      },
      arrow: {
        right: 3.5,
      },
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
