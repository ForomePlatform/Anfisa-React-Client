import { FC, memo, useEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'

import { StatList } from '@declarations'
import { t } from '@i18n'
import { theme } from '@theme'
import { ChartRenderModes } from './chart.interface'
import chartStore from './chart.store'
import Chart from './chart-register'
import { PieChartWrapper } from './pie-chart-wrapper'

const CollapseBtn = styled.span`
  font-size: 12px;
  font-weight: 500;
  position: relative;
  bottom: 16px;
  left: 10px;
  cursor: pointer;
  color: ${theme('colors.blue.bright')};
`

interface IQueryBuilderSubgroupChartProps {
  // TODO: change types when refactoring
  // subGroupItem: TPropertyStatus
  subGroupItem: StatList
}

export const QueryBuilderSubgroupChart: FC<IQueryBuilderSubgroupChartProps> =
  memo(
    ({ subGroupItem }) => {
      const { getBarChartConfig, getPieChartConfig, getChartData } = chartStore

      const chartData = getChartData(subGroupItem)

      const { 'render-mode': renderMode } = subGroupItem
      const isPieChart = renderMode === ChartRenderModes.Pie

      const canvasRef = useRef<HTMLCanvasElement>(null)
      const chartRef = useRef<Chart>()

      useEffect(() => {
        if (!canvasRef.current) {
          return
        }

        if (chartData) {
          const chart = chartRef.current

          const currentChartConfig = isPieChart
            ? getPieChartConfig(chartData)
            : getBarChartConfig(chartData)

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
          {isPieChart ? (
            <PieChartWrapper subGroupItem={subGroupItem}>
              <canvas ref={canvasRef} />
            </PieChartWrapper>
          ) : (
            <canvas ref={canvasRef} />
          )}
        </div>
      )
    },
    (prevProps, nextProps) =>
      isEqual(prevProps.subGroupItem, nextProps.subGroupItem),
  )

QueryBuilderSubgroupChart.displayName = 'QueryBuilderSubgroupChart'
