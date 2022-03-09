import { ChartConfiguration, ChartData } from 'chart.js'
import { makeAutoObservable } from 'mobx'

import { ChartRenderModes } from './chart.interface'

class ChartStore {
  constructor() {
    makeAutoObservable(this)
  }

  setDoughnutChartHeight() {}

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

  minPieChartHeight = 126
  getFullPieChartHeight(labelsQuantity: number) {
    const labelHeight = 24
    const calculatedPieChartHeight = labelsQuantity * labelHeight

    return calculatedPieChartHeight
  }
}

export default new ChartStore()
