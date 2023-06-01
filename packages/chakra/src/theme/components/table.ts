import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { colors } from "../colors";

const $border = cssVar("table-border");

export const Table: MultiStyleConfig = {
  parts: [
    "container",
    "footer",
    "header",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
  ],
  baseStyle: {
    container: {
      [$border.variable]: colors.gray[200],

      w: "full",
      pos: "relative",
      border: "1px",
      borderColor: $border.reference,
      rounded: "lg",
      overflow: "hidden",

      th: {
        _first: {
          borderLeft: "none",
        },
        _last: {
          borderRight: "none",
        },
      },

      td: {
        _first: {
          borderLeft: "none",
        },
        _last: {
          borderRight: "none",
        },
      },

      tr: {
        _last: {
          td: {
            borderBottom: "none",
          },
        },
        _first: {
          th: {
            borderTop: "none",
          },
          td: {
            borderTop: "none",
          },
        },
      },
    },
    table: {
      [$border.variable]: colors.gray[200],
    },
    header: {
      borderBottom: "1px",
      borderColor: $border.reference,
    },
    footer: {
      borderTop: "1px",
      borderColor: $border.reference,
    },
    thead: {
      bgColor: "gray.50",
    },
    th: {
      px: 3,
      py: 6,
      textTransform: "unset",
      color: "gray.500",
      fontSize: "xs",
      lineHeight: "18px",
      fontWeight: "medium",
    },
    td: {
      py: 4,
      px: 6,
      color: "neutrals.600",
      fontSize: "sm",
      lineHeight: "20px",
      letterSpacing: "0.02em",
    },
  },
  variants: {
    default: {
      td: {
        borderY: "1px",
        borderColor: $border.reference,
        _first: {
          borderLeft: "1px",
          borderColor: $border.reference,
        },
        _last: {
          borderRight: "1px",
          borderColor: $border.reference,
        },
      },

      th: {
        borderY: "1px",
        borderColor: $border.reference,
        _first: {
          borderLeft: "1px",
          borderColor: $border.reference,
        },
        _last: {
          borderRight: "1px",
          borderColor: $border.reference,
        },
      },
    },
    bordered: {
      td: {
        border: "1px",
        borderColor: $border.reference,
      },

      th: {
        border: "1px",
        borderColor: $border.reference,
      },
    },
  },
  sizes: {
    md: {
      header: {
        p: 4,
      },
      footer: {
        p: 4,
      },
      th: {
        py: 3,
        px: 4,
        fontSize: "xs",
        lineHeight: "18px",
        fontWeight: "medium",
      },
      td: {
        p: 4,
        fontSize: "sm",
        lineHeight: "20px",
        letterSpacing: "0.02em",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "default",
  },
};
