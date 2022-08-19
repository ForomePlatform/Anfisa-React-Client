import styles from './bar-chart.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { SvgChart } from '@components/svg-chart/svg-chart'
import { TBarChartData } from '../unit-chart.interface'
import { drawBarChart } from './bar-chart.utils'

interface IBarChartProps {
  data: TBarChartData
  totalItems: number
  width?: number
  height?: number
  isDashboard?: boolean
  isLight?: boolean
  selectedVariants?: string[]
  dataTestId?: string
  onSelectVariantByChart?: (variant: string) => void
}

export const BarChart = ({
  data,
  totalItems,
  width,
  height,
  isDashboard,
  isLight,
  selectedVariants,
  dataTestId,
  onSelectVariantByChart,
}: IBarChartProps): ReactElement => {
  const isVariantRepresentedInChart = useMemo(() => {
    return data.some(item => selectedVariants?.includes(item[0]))
  }, [data, selectedVariants])

  const renderBarChartLegend = () => {
    const defaultLegend = t('filter.chart.shownSignificantItems', {
      items: data.length,
      total: totalItems,
    })

    const specialLegent = t('filter.chart.noVisualRepresentation')

    if (!selectedVariants?.length) {
      return defaultLegend
    } else {
      return isVariantRepresentedInChart ? defaultLegend : specialLegent
    }
  }

  return (
    <div>
      <SvgChart
        data-testid={dataTestId}
        className={cn(styles.barChart, isLight && styles.barChart_light)}
        width={width}
        height={height}
        data={data}
        selectedVariants={selectedVariants}
        render={drawBarChart}
        onSelectVariantByChart={onSelectVariantByChart}
        isDashboard={isDashboard}
      />
      {totalItems > data.length && (
        <div className="text-xs text-grey-blue text-center mt-1 -mb-1">
          {renderBarChartLegend()}
        </div>
      )}
    </div>
  )
}
