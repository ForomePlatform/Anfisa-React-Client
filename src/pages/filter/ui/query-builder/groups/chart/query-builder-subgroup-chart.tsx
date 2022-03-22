import { useEffect, useRef } from 'react'
import { ChartData } from 'chart.js'

import { AttributeKinds, TPropertyStatus } from '@service-providers/common'
import { ChartRenderModes } from './chart.interface'
import Chart from './chart-register'
import { PieChartWrapper } from './pie-chart-wrapper'
import { getChartConfig, useChartData } from './utils'

interface IQueryBuilderSubgroupChartProps {
  subGroupItem: TPropertyStatus
}

export const QueryBuilderSubgroupChart = ({
  subGroupItem,
}: IQueryBuilderSubgroupChartProps) => {
  const { 'render-mode': renderMode = ChartRenderModes.Linear } = subGroupItem
  const isPieChart = renderMode === ChartRenderModes.Pie

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart>()
  const renderModeRef = useRef<string | undefined>()

  const chartData = useChartData(subGroupItem)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    if (chartData) {
      const chart = chartRef.current

      if (!chart || renderMode !== renderModeRef.current) {
        chartRef.current?.destroy()
        chartRef.current = new Chart(
          canvasRef.current,
          getChartConfig(chartData, renderMode),
        )
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
    renderModeRef.current = renderMode
  }, [chartData, renderMode])

  useEffect(() => {
    return () => {
      chartRef.current?.destroy()
    }
  }, [])

  return (
    <div className="rounded-md bg-blue-secondary p-2 mr-5">
      {subGroupItem.kind !== AttributeKinds.NUMERIC && isPieChart ? (
        <PieChartWrapper chartData={chartData as ChartData<'doughnut'>}>
          <canvas ref={canvasRef} />
        </PieChartWrapper>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  )
}
