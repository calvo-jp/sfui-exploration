import { MultiStyleConfig } from "@chakra-ui/react";

export const Input: MultiStyleConfig = {
  parts: ["field", "addon", "element"],
  variants: {
    outline() {
      return {
        addon: {
          bg: "white",
          color: "neutral.700",
          _hover: {
            bg: "neutral.50",
          },
        },
        element: {
          color: "neutral.500",
          pointerEvents: "none",
        },
        field: {
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          borderColor: "neutral.200",
          _placeholder: {
            color: "neutral.500",
          },
          _hover: {
            borderColor: "neutral.300",
          },
          _focus: {
            borderColor: "primary.700",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          },
          _invalid: {
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderColor: "error.700",
            _focus: {
              borderColor: "error.700",
            },
          },
          _disabled: {
            color: "neutral.600",
            cursor: "not-allowed",
            borderColor: "neutral.100",
            _hover: {
              borderColor: "neutral.100",
            },
            _placeholder: {
              color: "neutral.300",
            },
          },
        },
      };
    },
  },
  sizes: {
    sm: {
      addon: {
        h: "40px",
      },
      field: {
        h: "40px",
        py: "8px",
        px: "12px",

        rounded: "4px",
      },
    },
    md: {
      addon: {
        h: "44px",
      },
      field: {
        h: "44px",
        py: "10px",
        px: "14px",
        rounded: "4px",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
    colorScheme: "primary",
  },
};
