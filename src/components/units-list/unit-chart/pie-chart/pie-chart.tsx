import styles from './pie-chart.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { SvgChart } from '@components/svg-chart'
import { PieChartLegend } from '@components/units-list/unit-chart/pie-chart/pie-chart-legend'
import { TPieChartData } from '../unit-chart.interface'
import { drawPieChart, getShortNumber } from './pie-chart.utils'

interface IPieChartProps {
  data: TPieChartData
  selectedVariants?: string[]
  isDashboard?: boolean
  isLight?: boolean
  onSelectVariantByChart?: (variant: string) => void
}

export const PieChart = ({
  data,
  selectedVariants,
  isDashboard,
  isLight,
  onSelectVariantByChart,
}: IPieChartProps): ReactElement | null => {
  const totalCountsOnChart = data.reduce(
    (previousValue, variant) => previousValue + variant[1],
    0,
  )

  return (
    <div className={styles.pieChart}>
      <PieChartLegend
        data={data}
        className={cn(
          styles.pieChart__legend,
          isLight && styles.pieChart__legend_light,
        )}
        total={totalCountsOnChart}
        selectedVariants={selectedVariants}
      />
      <div className={cn(styles.pieChart__chart, styles.chart)}>
        <div className={styles.chart__total}>
          <span>{t('filter.chart.total')}</span>
          <div
            className={cn(
              styles.chart__totalValue,
              isLight && styles.chart__totalValue_light,
            )}
          >
            {getShortNumber(totalCountsOnChart)}
          </div>
        </div>
        <SvgChart
          data={data}
          selectedVariants={selectedVariants}
          render={drawPieChart}
          isDashboard={isDashboard}
          onSelectVariantByChart={onSelectVariantByChart}
        />
      </div>
    </div>
  )
}
