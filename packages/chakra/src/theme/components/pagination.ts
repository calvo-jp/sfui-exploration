import { MultiStyleConfig } from "@chakra-ui/react";

export const Pagination: MultiStyleConfig = {
  parts: [
    "container",
    "group",
    "range",
    "next",
    "prev",
    "page",
    /*
     * size control
     */
    "size",
    /*
     * size control options
     */
    "sizeoptions",
    "sizeoption",
  ],
  baseStyle() {
    const controlsCommonCss = {
      w: 10,
      h: 10,
      gap: 2,
      outline: "none",
      border: "1px",
      borderColor: "neutral.200",
      rounded: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "neutral.900",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "medium",
      /*
       * boxShadow: "0px 1px 2px " + applyOpacity(colors.gray[900], 5),
       */
      _disabled: {
        color: "neutral.500",
        cursor: "not-allowed",
      },
    };

    return {
      container: {
        gap: 4,
        display: "flex",
        alignItems: "center",
      },

      group: {
        display: "flex",
        alignItems: "center",

        "& > button": {
          boxShadow: "none",
          rounded: "none",
          _first: {
            roundedStart: "lg",
          },
          _last: {
            roundedEnd: "lg",
          },
          _notFirst: {
            borderLeft: "none",
          },
          _hover: {
            bg: "neutral.50",
          },
          _focus: {
            bg: "neutral.50",
            outline: "none",
          },
        },
      },

      page: {
        ...controlsCommonCss,
      },
      next: {
        ...controlsCommonCss,
      },
      prev: {
        ...controlsCommonCss,
      },
      size: {
        ...controlsCommonCss,
        w: "auto",
        px: 4,
        transition: "border-color 300ms ease-in-out",
        _focus: {
          borderColor: "neutral.300",
        },
        _expanded: {
          borderColor: "neutral.300",
        },
      },

      sizeoptions: {
        bg: "white",
        zIndex: "modal",
        border: "1px",
        borderColor: "neutral.200",
        rounded: "md",
        overflow: "hidden",
        outline: "none",
      },

      sizeoption: {
        px: 4,
        py: 2,
        color: "neutral.800",
        cursor: "pointer",
        fontSize: "14px",
        lineHeight: "20px",
        outline: "none",
        _selected: {
          bg: "neutral.100",
        },
      },

      range: {
        color: "neutral.600",
        fontSize: "14px",
        lineHeight: "20px",
      },
    };
  },
};
