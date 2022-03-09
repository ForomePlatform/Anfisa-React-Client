import { ChartData } from 'chart.js'

import { theme } from '@theme'
import { ChartRenderModes } from '../chart.interface'

export const getVariantsChartData = (subGroupItem: any) => {
  const { variants, 'render-mode': renderMode } = subGroupItem

  const titleList = variants.map((element: any[]) => element[0])

  const quantityList = variants.map((element: any[]) => +element[1])

  const colorListForPieChart = [
    theme('colors.blue.bright'),
    theme('colors.purple.bright'),
    theme('colors.yellow.secondary'),
    theme('colors.orange.bright'),
  ]

  const defaultColorList = [theme('colors.blue.bright')]

  const colors =
    renderMode === ChartRenderModes.Pie
      ? colorListForPieChart
      : defaultColorList

  const data: ChartData = {
    labels: titleList,
    datasets: [
      {
        data: quantityList,
        backgroundColor: colors,
        radius: 54,
      },
    ],
  }

  return data
}
