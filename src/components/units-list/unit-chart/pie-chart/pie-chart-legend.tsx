import styles from './pie-chart.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { defaultColors, selectedColors } from '../unit.chart.data'
import { TPieChartData } from '../unit-chart.interface'
import { getDifferentBarColors } from '../utils/getDifferentColors'

export interface IPieChartLegendProps {
  className?: string
  data: TPieChartData
  total: number
  selectedVariants: string[] | undefined
}

const itemsInCollapsedMode = 4

export const PieChartLegend = ({
  className,
  data,
  total,
  selectedVariants,
}: IPieChartLegendProps): ReactElement => {
  const [isCollapsed, setCollapsed] = useState(true)

  const shouldShowCollapseBtn = data.length > itemsInCollapsedMode

  const variants =
    shouldShowCollapseBtn && isCollapsed
      ? data.slice(0, itemsInCollapsedMode)
      : data

  return (
    <div className={cn(styles.legend, className)}>
      {variants.map(([name, value], index) => (
        <div
          key={name}
          className={cn(styles.legend__variant, styles.legendVariant)}
        >
          <div className={styles.legendVariant__label}>
            <span
              className={styles.legendVariant__icon}
              style={{
                backgroundColor: selectedVariants?.includes(name)
                  ? getDifferentBarColors(index, selectedColors)
                  : getDifferentBarColors(index, defaultColors),
                border: selectedVariants?.includes(name)
                  ? 'none'
                  : `1px solid ${getDifferentBarColors(index, selectedColors)}`,
              }}
            />
            <div className={styles.legendVariant__info}>
              <span className={styles.legendVariant__title}>{name}</span>
              <span className={styles.legendVariant__quantity}>
                {t('filter.chart.variants', {
                  value,
                })}
              </span>
            </div>
          </div>
          <div>{((value / total) * 100).toFixed(2)}%</div>
        </div>
      ))}
      {shouldShowCollapseBtn && (
        <button
          className={styles.legend__collapseButton}
          onClick={() => setCollapsed(!isCollapsed)}
        >
          {isCollapsed ? t('filter.chart.seeAll') : t('filter.chart.hide')}
        </button>
      )}
    </div>
  )
}
