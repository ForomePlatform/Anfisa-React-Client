import { ChartConfiguration, ChartData } from 'chart.js'
import { makeAutoObservable } from 'mobx'

import { theme } from '@theme'
import { ChartRenderModes } from './chart.interface'

class ChartStore {
  constructor() {
    makeAutoObservable(this)
  }

  minPieChartHeight = 126

  getFullPieChartHeight(labelsQuantity: number) {
    const labelHeight = 24
    const calculatedPieChartHeight = labelsQuantity * labelHeight

    return calculatedPieChartHeight
  }

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
          legend: {
            maxWidth: 200,
            align: 'center',
            position: 'left',
            fullSize: true,
            labels: {
              boxWidth: 100,
              usePointStyle: true,
              color: '#ffffff',
            },
          },
        },
        borderColor: 'transparent',
        aspectRatio: 1.8,
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

  getVariantsChartData = (subGroupItem: any) => {
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

  getChartData = (subGroupItem: any): ChartData | undefined => {
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
