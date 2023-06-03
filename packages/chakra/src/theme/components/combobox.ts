import { MultiStyleConfig } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { Input } from "./input";

export const Combobox: MultiStyleConfig = {
  parts: ["control", "input", "arrow", "options", "option"],
  baseStyle(context) {
    return {
      control: {
        display: "flex",
        alignItems: "center",
      },
      input: {
        w: "full",
        flexGrow: 1,
        ...runIfCallable(Input.baseStyle, context)?.field,
      },
      arrow: {
        transform: "rotate(0deg)",
        transition: "transform 300ms ease-in-out",
        _expanded: {
          transform: "rotate(180deg)",
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
      input: {
        ...runIfCallable(Input.sizes?.md)?.field,
      },
      option: {
        px: 3,
      },
    },
    lg: {
      input: {
        ...runIfCallable(Input.sizes?.md)?.field,
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
