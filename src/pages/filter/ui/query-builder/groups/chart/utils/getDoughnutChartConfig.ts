import { ChartConfiguration, ChartData } from 'chart.js'

export const getDoughnutChartConfig = (data: ChartData): ChartConfiguration => {
  return {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        legend: {
          align: 'center',
          position: 'left',
          fullSize: true,
          labels: {
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
