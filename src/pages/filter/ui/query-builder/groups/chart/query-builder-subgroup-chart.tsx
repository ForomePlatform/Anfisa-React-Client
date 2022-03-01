import { FC, memo, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'

import { StatList } from '@declarations'
import Chart from './chart-register'
import { getChartConfig, getChartData } from './utils'
import { getDoughnutChartConfig } from './utils/getDoughnutChartConfig'

interface IQueryBuilderSubgroupChartProps {
  // TODO: change types when refactoring
  // subGroupItem: TPropertyStatus
  subGroupItem: StatList
}

export enum ChartRenderModes {
  Pie = 'pie',
  Bar = 'bar',
}

export const QueryBuilderSubgroupChart: FC<IQueryBuilderSubgroupChartProps> =
  memo(
    ({ subGroupItem }) => {
      const { 'render-mode': renderMode } = subGroupItem

      const canvasRef = useRef<HTMLCanvasElement>(null)
      const chartRef = useRef<Chart>()

      useEffect(() => {
        if (!canvasRef.current) {
          return
        }

        const chartData = getChartData(subGroupItem)

        if (chartData) {
          const chart = chartRef.current

          const currentChartConfig =
            renderMode === ChartRenderModes.Pie
              ? getDoughnutChartConfig(chartData)
              : getChartConfig(chartData)

          if (!chart) {
            chartRef.current = new Chart(canvasRef.current, currentChartConfig)
          } else {
            chart.data = chartData
            chart.update()
          }
        } else {
          if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = undefined
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [subGroupItem])

      useEffect(() => {
        return () => {
          chartRef.current?.destroy()
        }
      }, [])

      return (
        <div className="rounded-md bg-blue-secondary p-2 mr-5">
          <canvas ref={canvasRef} />
        </div>
      )
    },
    (prevProps, nextProps) =>
      isEqual(prevProps.subGroupItem, nextProps.subGroupItem),
  )

QueryBuilderSubgroupChart.displayName = 'QueryBuilderSubgroupChart'
