import { ChartConfiguration, ChartData } from 'chart.js'
import { makeAutoObservable } from 'mobx'

import { StatList } from '@declarations'
import { theme } from '@theme'
import { ChartRenderModes } from './chart.interface'

class ChartStore {
  constructor() {
    makeAutoObservable(this)
  }

  // temporary solution. I'll fix it in the next PR
  colorListForPieChart: string[] = [
    theme('colors.blue.bright'),
    theme('colors.purple.bright'),
    theme('colors.yellow.secondary'),
    theme('colors.orange.bright'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
    theme('colors.grey.disabled'),
  ]

  getBarChartConfig = (data: ChartData): ChartConfiguration => ({
    type: 'bar',
    data,
    options: {
      layout: { padding: { left: 12, right: 12, top: 12 } },
      plugins: { legend: { display: false } },
      scales: {
        yAxes: {
          ticks: { color: theme('colors.grey.blue') },
          grid: {
            borderWidth: 0,
            borderColor: theme('colors.grey.blue'),
            lineWidth: 1,
          },
          type: 'logarithmic',
        },
        xAxes: {
          display: false,
          grid: {
            borderWidth: 1,
            borderColor: theme('colors.grey.blue'),
            lineWidth: 0,
          },
          ticks: { color: theme('colors.grey.blue') },
        },
      },
    },
  })

  getPieChartConfig(data: ChartData): ChartConfiguration {
    return {
      type: 'doughnut',
      data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        borderColor: 'transparent',
      },
    }
  }

  getHistogramChartData(histogram: any[]) {
    const titleList = histogram[3].map(() => {
      return ''
    })

    titleList[0] = histogram[1]
    titleList[titleList.length - 1] = histogram[2]

    const quantityList = histogram[3]

    const data: ChartData = {
      labels: titleList,
      datasets: [
        {
          data: quantityList,
          backgroundColor: [theme('colors.blue.bright')],
        },
      ],
    }

    return data
  }

  getVariantsChartData = (subGroupItem: StatList) => {
    const { variants, 'render-mode': renderMode } = subGroupItem

    const filteredVariants = variants.sort(
      ([_firstName, firstNumber], [_secondName, secondNumber]) =>
        secondNumber - firstNumber,
    )

    const titleList = filteredVariants.map(varaint => varaint[0])

    const quantityList = filteredVariants.map(element => +element[1])

    const defaultColorList = [theme('colors.blue.bright')]

    const colors =
      renderMode === ChartRenderModes.Pie
        ? this.colorListForPieChart
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

  getChartData = (subGroupItem: StatList): ChartData | undefined => {
    const { variants, histogram } = subGroupItem

    if (histogram) {
      return this.getHistogramChartData(histogram)
    }

    if (variants) {
      return this.getVariantsChartData(subGroupItem)
    }
  }
}

export default new ChartStore()
