import { ChartData } from 'chart.js'

import { getHistogramChartData } from './getHistogramChartData'
import { getVariantsChartData } from './getVariantsChartData'

export const getChartData = (subGroupItem: any): ChartData | undefined => {
  const { variants, histogram } = subGroupItem

  if (histogram) {
    return getHistogramChartData(histogram)
  }

  if (variants) {
    return getVariantsChartData(subGroupItem)
  }
}
