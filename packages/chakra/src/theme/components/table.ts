import { MultiStyleConfig } from "@chakra-ui/react";

export const Table: MultiStyleConfig = {
  parts: [
    "container",
    "footer",
    "header",
    "loader",
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
      display: "block",
      overflowX: "auto",
      overflowY: "hidden",
      maxWidth: "full",
      whiteSpace: "nowrap",
      WebkitOverflowScrolling: "touch",
      border: "1px",
      borderColor: "gray.200",
      rounded: "lg",
    },
    header: {
      w: "full",
      pos: "sticky",
      left: 0,
      padding: 4,
    },
    footer: {
      w: "full",
      pos: "sticky",
      left: "0",
      padding: 4,
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
    simple: {
      table: {},
      tr: {
        _first: {
          borderTop: "1px",
          borderColor: "gray.200",
        },
      },
      th: {
        borderColor: "gray.200",
      },
      td: {
        borderColor: "gray.200",
      },
    },
    bordered: {
      table: {},
      th: {
        border: "1px",
        borderColor: "gray.200",
        _first: {
          borderLeft: "none",
        },
        _last: {
          borderRight: "none",
        },
      },
      td: {
        border: "1px",
        borderColor: "gray.200",
        _first: {
          borderLeft: "none",
        },
        _last: {
          borderRight: "none",
        },
      },
    },
  },
  defaultProps: {
    variant: "simple",
  },
};
