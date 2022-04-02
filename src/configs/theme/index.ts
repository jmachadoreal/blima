import { createStitches } from 'stitches-native'

import { colors } from './shared/colors'
import { fonts, sizes as fontSizes } from './shared/fonts'
import { radii } from './shared/radii'
import { sizes } from './shared/sizes'
import { space } from './shared/space'
import { border } from './utils/border'
import { flex } from './utils/flex'
import { margin } from './utils/margin'
import { padding } from './utils/padding'

export const { ThemeProvider, css, styled, createTheme, useTheme, theme } =
  createStitches({
    theme: {
      colors,
      fonts,
      fontSizes,
      radii,
      sizes,
      space
    },
    utils: {
      ...margin,
      ...padding,
      ...flex,
      ...border
    },
    media: {
      '@sm': '(width >= 360px)',
      '@md': '(width >= 740px)',
      '@lg': '(width >= 1284px)',
      '@xl': '(width >= 1536px)'
    }
  })
