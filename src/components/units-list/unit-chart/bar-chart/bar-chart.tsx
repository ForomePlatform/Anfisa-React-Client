import styles from './bar-chart.module.css'

import { ReactElement } from 'react'
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
  isLight,
  selectedVariants,
  dataTestId,
  onSelectVariantByChart,
}: IBarChartProps): ReactElement => {
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
      />
      {totalItems > data.length && (
        <div className="text-xs text-grey-blue text-center mt-1 -mb-1">
          {t('filter.chart.shownSignificantItems', {
            items: data.length,
            total: totalItems,
          })}
        </div>
      )}
    </div>
  )
}
