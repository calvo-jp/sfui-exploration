import { StyleConfig, cssVar } from '@chakra-ui/react';
import { colors } from '../colors';

const $fgColor = cssVar('tooltip-fg');
const $bgColor = cssVar('tooltip-bg');
const $arrowBg = cssVar('popper-arrow-bg');

export const Tooltip: StyleConfig = {
  baseStyle: {
    [$fgColor.variable]: colors.neutral[100],
    [$bgColor.variable]: colors.neutral[900],
    [$arrowBg.variable]: $bgColor.reference,

    py: 2,
    px: 3,
    color: $fgColor.reference,
    bgColor: $bgColor.reference,
    rounded: 2,
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: 4.5,
  },
};
