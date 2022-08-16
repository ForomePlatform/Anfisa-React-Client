import get from 'lodash/get'

import colors from './colors'

export const AppTheme = {
  fontSizes: [8, 10, 12, 14, 16, 18, 20, 24, 32, 36],
  lineHeights: [16, 17, 20, 21, 22, 23, 24, 28, 30, 42],
  colors,
}

export const theme = (path: string): any => get(AppTheme, path, null)
