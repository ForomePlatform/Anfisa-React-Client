import { ChartData } from 'chart.js'

export const reduceChartData = (
  data: ChartData<'doughnut' | 'bar'>,
  limit: number,
): ChartData<'doughnut' | 'bar'> => {
  if (data.datasets[0].data.length <= limit) {
    return data
  }

  return {
    labels: data.labels && [...data.labels.slice(0, limit - 1), 'Other'],
    datasets: [
      {
        ...data.datasets[0],
        data: [
          ...data.datasets[0].data.slice(0, limit - 1),
          data.datasets[0].data
            .slice(limit - 1)
            .reduce((prev, value) => prev + value),
        ],
      },
    ],
  }
}
