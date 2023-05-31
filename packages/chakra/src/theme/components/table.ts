import { MultiStyleConfig, cssVar } from "@chakra-ui/react";
import { colors } from "../colors";

const $border = cssVar("table-border");

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
      [$border.variable]: colors.gray[200],

      display: "block",
      overflowX: "auto",
      overflowY: "hidden",
      maxWidth: "full",
      whiteSpace: "nowrap",
      WebkitOverflowScrolling: "touch",
      border: "1px",
      borderColor: $border.reference,
      rounded: "lg",
    },
    table: {
      /*
       * Also need to pass this here
       * just in case they don't use TableContainer
       */
      [$border.variable]: colors.neutral[200],
    },
    header: {
      pos: "sticky",
      left: 0,
      padding: 4,
    },
    footer: {
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
          borderColor: $border.reference,
        },
      },
      th: {
        borderColor: $border.reference,
      },
      td: {
        borderColor: $border.reference,
      },
    },
    bordered: {
      th: {
        border: "1px",
        borderColor: $border.reference,
        _first: {
          borderLeft: "none",
        },
        _last: {
          borderRight: "none",
        },
      },
      td: {
        border: "1px",
        borderColor: $border.reference,
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
