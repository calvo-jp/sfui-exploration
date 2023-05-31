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
    },
    table: {
      /*
       * Also need to pass this here
       * just in case they don't use TableContainer
       */
      [$border.variable]: colors.neutral[200],
    },
    header: {
      p: 4,
    },
    footer: {
      p: 4,
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
