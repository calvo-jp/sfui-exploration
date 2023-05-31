import { MultiStyleConfig } from "@chakra-ui/react";

export const Toast: MultiStyleConfig = {
  parts: [
    "container",
    "icon",
    /* title & description wrapper */
    "content",
    "title",
    "description",
    "closeButton",
  ],
  variants: {
    subtle({ colorScheme }) {
      return {
        container: {
          bg: `${colorScheme}.500`,
          border: "1px",
          borderColor: `${colorScheme}.600`,
          w: "full",
          minW: "400px",
          maxW: "550px",
          rounded: "8px",
          display: "flex",
          alignItems: "center",

          /* [WORKARROUND] neutral pallete has different contrast */
          ...(colorScheme === "neutral" && {
            bg: "neutral.100",
            borderColor: "neutral.300",
          }),
          /* [WORKARROUND] blue pallete has different contrast */
          ...(colorScheme === "blue" && {
            bg: "blue.100",
            borderColor: "blue.300",
          }),
        },
        icon: {
          color: `${colorScheme}.800`,
          flexShrink: 0,
        },
        content: {
          flexGrow: 1,
        },
        title: {
          color: `${colorScheme}.900`,
          fontWeight: "600",
        },
        description: {
          color: `${colorScheme}.900`,
          fontWeight: "500",
          letterSpacing: "unset",
        },
        closeButton: {
          color: `${colorScheme}.700`,
          rounded: "md",
          flexShrink: 0,
          alignSelf: "start",
          _hover: {
            bg: "blackAlpha.50",
            color: `${colorScheme}.800`,
          },
        },
      };
    },
  },
  sizes: {
    md: {
      container: {
        p: 4,
        gap: 3,
      },
      icon: {
        w: 5,
        h: 5,
      },
      title: {
        fontSize: "16px",
        lineHeight: "24px",
      },
      description: {
        fontSize: "14px",
        lineHeight: "20px",
      },
      closeButton: {
        ".chakra-toast__svg": {
          w: 5,
          h: 5,
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "subtle",
  },
};
