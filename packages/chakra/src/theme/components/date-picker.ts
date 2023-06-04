import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { colors } from "../foundation";
import { Button } from "./button";

const $border = cssVar("datepicker-border");

export const DatePicker: MultiStyleConfig = {
  parts: [
    "header",
    "headerlabel",
    "headerbutton",
    "sidebar",
    "sidebaritem",
    "calendar",
    "calendaritem",
    "footer",
    "footerbutton",
    "footerinput",
    "divider",
  ],
  baseStyle({ theme, colorMode, colorScheme }) {
    return {
      container: {
        [$border.variable]: colors.gray[200],

        width: "fit-content",
        rounded: "8px",
        border: "1px",
        borderColor: $border.reference,
        bgColor: "white",
        display: "flex",
      },
      header: {
        display: "flex",
        alignItems: "center",
      },
      headerlabel: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px",
        color: "gray.700",
      },
      headerbutton: {
        width: "36px",
        height: "36px",
        color: "gray.500",
        rounded: "full",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "colors 300ms ease-in-out",
        _hover: {
          color: "gray.600",
          bgColor: "gray.50",
        },

        ".datepicker-headerbutton-icon": {
          width: "20px",
          height: "20px",
        },
      },

      sidebar: {
        display: "flex",
        flexDir: "column",
        paddingY: "12px",
        paddingX: "16px",
      },

      sidebaritem: {
        width: "150px",
        paddingX: "16px",
        paddingY: "10px",
        textAlign: "left",
        rounded: "6px",
        color: "neutral.700",
        fontSize: "14px",
        lineHeight: "20px",
        transition: "all 300ms ease-in-out",

        _hover: {
          color: "neutral.900",
          fontWeight: "medium",
        },

        "&[data-selected]": {
          color: "neutral.900",
          bgColor: "neutral.100",
          fontWeight: "medium",
        },
      },

      calendar: {
        width: "fit-content",
        bgColor: "white",
        rounded: "8px",
        paddingX: "24px",
        paddingY: "20px",
        borderColor: $border.reference,

        "& table": {
          marginTop: "12px",
        },

        "& th": {
          width: "40px",
          height: "40px",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
        },
      },

      calendaritem: {
        width: "40px",
        height: "40px",
        color: "neutral.800",
        fontSize: "14px",
        lineHeight: "20px",
        rounded: "full",
        transition: "colors 300ms ease-in-out",

        _hover: {
          bgColor: "neutral.200",
        },

        "&[data-placeholder]": {
          color: "neutral.600",
          _hover: {
            bgColor: "neutral.100",
          },
        },

        "&[data-today]": {
          bgColor: "neutral.200",
        },

        "&[data-selected]": {
          color: "white",
          bgColor: `${colorScheme}.700`,
        },

        "&[data-selected][data-placeholder]": {
          color: "neutral.600",
          bgColor: "unset",
          textDecoration: "line-through",
        },

        "&[data-inrange]": {
          bgColor: `${colorScheme}.100`,
          fontWeight: "medium",
        },

        "&[data-inrange][data-placeholder]": {
          bgColor: "unset",
          fontWeight: "normal",
          textDecoration: "line-through",
        },
      },

      footer: {
        display: "flex",
        padding: "16px",
        alignItems: "center",
      },

      footerinput: {
        h: "44px",
        py: "10px",
        px: "14px",
        minW: "125px",
        border: "1px",
        borderColor: "neutral.200",
        rounded: "4px",

        "&[data-empty]": {
          color: "neutral.500",
        },
      },

      footerbutton: {
        "& button": {
          ...runIfCallable(Button.baseStyle, {
            theme,
            colorMode,
            colorScheme,
          }),
          ...runIfCallable(Button.sizes?.md, {
            theme,
            colorMode,
            colorScheme,
          }),
        },
        "& .datepicker-footerbutton-cancel": {
          ...runIfCallable(Button.variants?.outline, {
            theme,
            colorMode,
            colorScheme: "neutral",
          }),
        },
        "& .datepicker-footerbutton-apply": {
          ...runIfCallable(Button.variants?.solid, {
            theme,
            colorMode,
            colorScheme,
          }),
        },
      },

      divider: {
        width: "full",
        borderStyle: "solid",
        borderColor: $border.reference,
        borderTopWidth: "1px",

        _horizontal: {
          width: "auto",
          alignSelf: "stretch",
          borderTopWidth: "0px",
          borderLeftWidth: "1px",
        },
      },
    };
  },

  defaultProps: {
    colorScheme: "primary",
  },
};
