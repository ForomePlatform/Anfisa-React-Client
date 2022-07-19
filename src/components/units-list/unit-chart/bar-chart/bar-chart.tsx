import styles from './bar-chart.module.css'

import { ReactElement } from 'react'

import { t } from '@i18n'
import { SvgChart } from '@components/svg-chart/svg-chart'
import { TBarChartData } from '../unit-chart.interface'
import { drawBarChart } from './bar-chart.utils'

interface IBarChartProps {
  data: TBarChartData
  totalItems: number
  width?: number
  height?: number
  dataTestId?: string
}

export const BarChart = ({
  data,
  totalItems,
  width,
  height,
  dataTestId,
}: IBarChartProps): ReactElement => {
  return (
    <div>
      <SvgChart
        data-testid={dataTestId}
        className={styles.barChart}
        width={width}
        height={height}
        data={data}
        render={drawBarChart}
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
