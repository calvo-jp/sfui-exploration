import { extendTheme } from '@chakra-ui/react';
import { borders } from './borders';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fontSizes } from './fontSizes';
import { fonts } from './fonts';
import { letterSpacings } from './letterSpacings';
import { lineHeights } from './lineHeights';
import { radii } from './radii';
import { sizes } from './sizes';
import { space } from './space';
import { styles } from './styles';

export const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
  breakpoints,
  components,
  borders,
  space,
  sizes,
  radii,
  lineHeights,
  letterSpacings,
  fontSizes,
});
