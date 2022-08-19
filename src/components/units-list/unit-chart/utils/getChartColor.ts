import { theme } from '@theme'
import { defaultColors, selectedColors } from '../unit.chart.data'
import { IGetChartColorsProps } from '../unit-chart.interface'
import { getDifferentBarColors } from './getDifferentColors'

export const getChartColor = ({
  selectedVariants,
  barName,
  index,
  type,
}: IGetChartColorsProps): string => {
  if (!selectedVariants?.length) {
    return getDifferentBarColors(index, defaultColors)
  }

  if (selectedVariants?.includes(barName)) {
    return getDifferentBarColors(index, selectedColors)
  } else {
    return type === 'fill'
      ? theme('colors.grey.disabled')
      : theme('colors.grey.blue')
  }
}
