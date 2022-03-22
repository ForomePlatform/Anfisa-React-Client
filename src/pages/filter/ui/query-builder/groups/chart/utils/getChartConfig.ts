import { ChartConfiguration, ChartData, ChartType } from 'chart.js'

import { theme } from '@theme'
import { ChartRenderModes } from '../chart.interface'
import { reduceChartData } from './reduceChartData'

type ChartConfigTemplate<T extends ChartType> = Omit<
  ChartConfiguration<T>,
  'data'
>

const PIE_CHART_CONFIG: ChartConfigTemplate<'doughnut'> = {
  type: 'doughnut',
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    borderColor: 'transparent',
    cutout: '60%',
    interaction: {
      mode: 'index',
      intersect: false,
    },
  },
}

const BAR_CHART_CONFIG: ChartConfigTemplate<'bar'> = {
  type: 'bar',
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
}

const PIE_CHART_MAX_ITEMS = 5

export const getChartConfig = (
  data: ChartData<'bar' | 'doughnut'>,
  renderMode: string,
): ChartConfiguration => {
  renderMode = renderMode.split(',', 2)[0]

  switch (renderMode) {
    case ChartRenderModes.Pie:
      return {
        ...PIE_CHART_CONFIG,
        data: reduceChartData(data, PIE_CHART_MAX_ITEMS),
      }
    default:
      return {
        ...BAR_CHART_CONFIG,
        data,
      }
  }
}
