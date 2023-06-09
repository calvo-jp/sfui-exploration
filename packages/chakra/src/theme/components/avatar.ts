import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { assignCommonPropsToKeys } from "../../utils";

const $size = cssVar("sf-avatar-size");
const $fontSize = cssVar("sf-avatar-fontsize");
const $lineHeight = cssVar("sf-avatar-lineheight");
const $letterSpacing = cssVar("sf-avatar-letterspacing");
const $badgeSize = cssVar("sf-avatar-badge-size");

export const Avatar: MultiStyleConfig = {
  parts: ["badge", "container", "excessLabel", "group", "label"],
  baseStyle() {
    return {
      container: {
        p: 0,
        w: $size.reference,
        h: $size.reference,
        color: "gray.600",
        bgColor: "gray.50",
        [ChakraAvatarSvgClassname]: {
          color: "gray.600",
        },
      },
      badge: {
        w: $badgeSize.reference,
        h: $badgeSize.reference,
        border: "1.5px solid",
        borderColor: "white",
        bgColor: "success.700",
        right: "unset",
        bottom: "unset",
        transform: "unset",
      },
      label: {
        fontSize: $fontSize.reference,
        fontWeight: "medium",
        lineHeight: $lineHeight.reference,
        letterSpacing: $letterSpacing.reference,
      },
      excessLabel: {
        m: 0,
        w: $size.reference,
        h: $size.reference,
        color: "gray.600",
        bgColor: "gray.50",
        border: "2px solid",
        borderColor: "white",
        fontSize: $fontSize.reference,
        fontWeight: "medium",
        lineHeight: $lineHeight.reference,
        letterSpacing: $letterSpacing.reference,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        order: 1,
      },
      group: {
        display: "flex",
        flexDir: "unset",
        "& > *": {
          m: 0,
          order: 0,
          _notFirst: {
            mr: "-8px",
          },
        },
      },
    };
  },
  sizes: {
    xs: {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "24px",
          [$fontSize.variable]: "12px",
          [$lineHeight.variable]: "18px",
          [$badgeSize.variable]: "6px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "18px",
        top: "18px",
      },
    },
    sm: {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "32px",
          [$fontSize.variable]: "14px",
          [$lineHeight.variable]: "20px",
          [$badgeSize.variable]: "8px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "24px",
        top: "24px",
      },
    },
    md: {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "40px",
          [$fontSize.variable]: "16px",
          [$lineHeight.variable]: "24px",
          [$badgeSize.variable]: "10px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "30px",
        top: "30px",
      },
    },
    lg: {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "48px",
          [$fontSize.variable]: "18px",
          [$lineHeight.variable]: "28px",
          [$badgeSize.variable]: "12px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "36px",
        top: "36px",
      },
    },
    xl: {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "56px",
          [$fontSize.variable]: "20px",
          [$lineHeight.variable]: "30px",
          [$badgeSize.variable]: "14px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "42px",
        top: "42px",
      },
    },
    "2xl": {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "64px",
          [$fontSize.variable]: "24px",
          [$lineHeight.variable]: "32px",
          [$badgeSize.variable]: "16px",
        },
        "group",
        "container",
      ),
      badge: {
        left: "50px",
        top: "50px",
      },
    },
    "3xl": {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "72px",
          [$fontSize.variable]: "28px",
          [$lineHeight.variable]: "28px",
          [$badgeSize.variable]: "18px",
        },
        "group",
        "container",
      ),
    },
    "4xl": {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "96px",
          [$fontSize.variable]: "32px",
          [$lineHeight.variable]: "32px",
          [$badgeSize.variable]: "20px",
        },
        "group",
        "container",
      ),
    },
    "5xl": {
      ...assignCommonPropsToKeys(
        {
          [$size.variable]: "160px",
          [$fontSize.variable]: "56px",
          [$lineHeight.variable]: "64px",
          [$letterSpacing.variable]: "-0.02em",
          [$badgeSize.variable]: "22px",
        },
        "group",
        "container",
      ),
    },
  },
  defaultProps: {
    size: "md",
  },
};

const ChakraAvatarSvgClassname = ".chakra-avatar__svg";
