import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { DecisionTreesResultsDataCy } from '@data-testid'
import { TPropertyStatus } from '@service-providers/common'
import { BarChart } from './bar-chart'
import { HistogramChart } from './histogram-chart'
import { PieChart } from './pie-chart'
import { ChartType } from './unit-chart.interface'
import { useChartConfig } from './utils'

interface IUnitChartProps {
  unit: TPropertyStatus
  selectedVariants?: string[]
  isDashboard?: boolean
  isLight?: boolean
  className?: string
  onSelectVariantByChart?: (variant: string) => void
}

export const UnitChart = ({
  unit,
  selectedVariants,
  isDashboard,
  isLight,
  className,
  onSelectVariantByChart,
}: IUnitChartProps): ReactElement | null => {
  const chartConfig = useChartConfig(unit)

  if (!chartConfig || !chartConfig.data.length) {
    return null
  }

  let chart: ReactNode = null
  switch (chartConfig.type) {
    case ChartType.Bar:
      chart = (
        <BarChart
          dataTestId={DecisionTreesResultsDataCy.unitChart}
          data={chartConfig.data}
          totalItems={chartConfig.totalItems}
          height={150}
          isDashboard={isDashboard}
          isLight={isLight}
          selectedVariants={selectedVariants}
          onSelectVariantByChart={onSelectVariantByChart}
        />
      )
      break
    case ChartType.Pie:
      chart = (
        <PieChart
          data={chartConfig.data}
          isDashboard={isDashboard}
          isLight={isLight}
          selectedVariants={selectedVariants}
          onSelectVariantByChart={onSelectVariantByChart}
        />
      )
      break
    case ChartType.Histogram:
      chart = (
        <HistogramChart
          data={chartConfig.data}
          mode={chartConfig.mode}
          height={150}
        />
      )
      break
  }

  if (!chart) {
    return null
  }

  return (
    <div className={cn('rounded-md bg-blue-secondary p-4 mr-5', className)}>
      {chart}
    </div>
  )
}
