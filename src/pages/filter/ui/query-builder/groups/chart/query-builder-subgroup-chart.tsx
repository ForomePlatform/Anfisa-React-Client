import { FC, memo, useEffect, useRef, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { toJS } from 'mobx'
import styled from 'styled-components'

import { StatList } from '@declarations'
import { t } from '@i18n'
import { theme } from '@theme'
import { ChartRenderModes } from './chart.interface'
import chartStore from './chart.store'
import Chart from './chart-register'
import { getChartConfig, getChartData } from './utils'

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
      const { getPieChartConfig, minPieChartHeight, getFullPieChartHeight } =
        chartStore

      const chartData = getChartData(subGroupItem)
      const labelsQuantity = chartData?.labels?.length ?? 0

      const [isListExpanded, setIsListExpanded] = useState(false)

      const pieChartHeight = isListExpanded
        ? getFullPieChartHeight(labelsQuantity)
        : minPieChartHeight

      const { 'render-mode': renderMode } = subGroupItem
      const isPieChart = renderMode === ChartRenderModes.Pie

      const canvasRef = useRef<HTMLCanvasElement>(null)
      const chartRef = useRef<Chart>()

      const shouldShowSeeAllBtn = isPieChart && labelsQuantity > 4
      const chartHeight = isPieChart ? pieChartHeight : 'auto'

      useEffect(() => {
        if (!canvasRef.current) {
          return
        }

        if (chartData) {
          const chart = chartRef.current

          const currentChartConfig = isPieChart
            ? getPieChartConfig(chartData)
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
        <div
          className="rounded-md bg-blue-secondary p-2 mr-5"
          style={{ height: chartHeight }}
        >
          <canvas ref={canvasRef} />

          {shouldShowSeeAllBtn && (
            <CollapseBtn onClick={() => setIsListExpanded(!isListExpanded)}>
              {isListExpanded
                ? t('filter.chart.collapse')
                : t('filter.chart.seeAll')}
            </CollapseBtn>
          )}
        </div>
      )
    },
    (prevProps, nextProps) =>
      isEqual(prevProps.subGroupItem, nextProps.subGroupItem),
  )

QueryBuilderSubgroupChart.displayName = 'QueryBuilderSubgroupChart'
