import { MultiStyleConfig } from "@chakra-ui/react";

export const Input: MultiStyleConfig = {
  parts: ["field", "addon", "element"],
  variants: {
    outline({ colorScheme }) {
      return {
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
            borderColor: `${colorScheme}.700`,
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          },
          _invalid: {
            boxShadow: "none",
            borderColor: "error.700",
            _focus: {
              borderColor: "error.700",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
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
      field: {
        rounded: "4px",
      },
    },
    md: {
      field: {
        rounded: "4px",
      },
    },
    lg: {
      field: {
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
