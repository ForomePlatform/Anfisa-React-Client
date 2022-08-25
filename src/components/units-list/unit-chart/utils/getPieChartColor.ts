import { defaultColors, selectedColors } from '../unit.chart.data'
import { IGetChartColorsProps } from '../unit-chart.interface'
import { getDifferentBarColors } from './getDifferentColors'

export const getPieChartColor = ({
  selectedVariants,
  barName,
  index,
  type,
}: IGetChartColorsProps): string => {
  if (!selectedVariants?.length && type === 'fill') {
    return getDifferentBarColors(index, defaultColors)
  }

  if (selectedVariants?.includes(barName) || type === 'stroke') {
    return getDifferentBarColors(index, selectedColors)
  }

  return getDifferentBarColors(index, defaultColors)
}
