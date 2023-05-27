import { MultiStyleConfig } from '@chakra-ui/react';

export const Table: MultiStyleConfig = {
  parts: ['container', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
  baseStyle: {
    thead: {
      bgColor: 'Gray.50',
    },
    th: {
      px: 3,
      py: 6,
      textTransform: 'unset',
      color: 'Gray.500',
      fontSize: 'xs',
      lineHeight: 4.5,
      fontWeight: 'medium',
    },
    td: {
      py: 4,
      px: 6,
      color: 'neutrals.600',
      fontSize: 'sm',
      lineHeight: 5,
      letterSpacing: '0.02em',
    },
  },
  variants: {
    simple: {
      tr: {
        _first: {
          borderTop: '1px',
          borderColor: 'Gray.200',
        },
      },
      th: {
        borderColor: 'Gray.200',
      },
      td: {
        borderColor: 'Gray.200',
      },
    },
    bordered: {
      th: {
        border: '1px',
        borderColor: 'Gray.200',
        _first: {
          borderLeft: 'none',
        },
        _last: {
          borderRight: 'none',
        },
      },
      td: {
        border: '1px',
        borderColor: 'Gray.200',
        _first: {
          borderLeft: 'none',
        },
        _last: {
          borderRight: 'none',
        },
      },
    },
  },
  defaultProps: {
    variant: 'simple',
  },
};
