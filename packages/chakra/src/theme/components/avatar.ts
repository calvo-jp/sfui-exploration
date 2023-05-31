import { MultiStyleConfig } from "@chakra-ui/react";

export const Avatar: MultiStyleConfig = {
  parts: ["badge", "container", "excessLabel", "group", "label"],
  baseStyle() {
    return {
      container: {
        p: 0,
        color: "gray.600",
        bgColor: "gray.50",
        [ChakraAvatarSvgClassname]: {
          color: "gray.600",
        },
      },
      badge: {
        border: "1.5px solid",
        borderColor: "white",
        bgColor: "success.700",
        right: "unset",
        bottom: "unset",
        transform: "unset",
      },
      label: {
        fontWeight: "medium",
      },
      excessLabel: {
        color: "gray.600",
        bgColor: "gray.50",
        border: "2px solid",
        borderColor: "white",
        fontWeight: "medium",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      group: {},
    };
  },
  sizes: {
    xs: {
      container: {
        width: "24px",
        height: "24px",
      },
      label: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      badge: {
        width: "6px",
        height: "6px",
        left: "18px",
        top: "18px",
      },
      excessLabel: {
        width: "24px",
        height: "24px",
        fontSize: "12px",
        lineHeight: "18px",
      },
    },
    sm: {
      container: {
        width: "32px",
        height: "32px",
      },
      label: {
        fontSize: "14px",
        lineHeight: "20px",
      },
      badge: {
        width: "8px",
        height: "8px",
        left: "24px",
        top: "24px",
      },
      excessLabel: {
        width: "32px",
        height: "32px",
        fontSize: "14px",
        lineHeight: "20px",
      },
    },
    md: {
      container: {
        width: "40px",
        height: "40px",
      },
      label: {
        fontSize: "16px",
        lineHeight: "24px",
      },
      badge: {
        width: "10px",
        height: "10px",
        left: "30px",
        top: "30px",
      },
      excessLabel: {
        width: "40px",
        height: "40px",
        fontSize: "16px",
        lineHeight: "24px",
      },
    },
    lg: {
      container: {
        width: "48px",
        height: "48px",
      },
      label: {
        fontSize: "18px",
        lineHeight: "28px",
      },
      badge: {
        width: "12px",
        height: "12px",
        left: "36px",
        top: "36px",
      },
    },
    xl: {
      container: {
        width: "56px",
        height: "56px",
      },
      label: {
        fontSize: "20px",
        lineHeight: "30px",
      },
      badge: {
        width: "14px",
        height: "14px",
        left: "42px",
        top: "42px",
      },
    },
    "2xl": {
      container: {
        width: "64px",
        height: "64px",
      },
      label: {
        fontSize: "24px",
        lineHeight: "32px",
      },
      badge: {
        width: "16px",
        height: "16px",
        left: "50px",
        top: "50px",
      },
    },
    "3xl": {
      container: {
        width: "72px",
        height: "72px",
      },
      label: {
        fontSize: "28px",
        lineHeight: "28px",
      },
      badge: {
        width: "18px",
        height: "18px",
      },
    },
    "4xl": {
      container: {
        width: "96px",
        height: "96px",
      },
      label: {
        fontSize: "32px",
        lineHeight: "32px",
      },
      badge: {
        width: "20px",
        height: "20px",
      },
    },
    "5xl": {
      container: {
        width: "160px",
        height: "160px",
      },
      label: {
        fontSize: "56px",
        lineHeight: "64px",
        letterSpacing: "-0.02em",
      },
      badge: {
        width: "22px",
        height: "22px",
      },
    },
  },
  defaultProps: {
    size: "md",
  },
};

const ChakraAvatarSvgClassname = ".chakra-avatar__svg";
