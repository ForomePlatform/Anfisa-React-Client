import styles from './units-list-unit.module.css'

import { ReactElement, useCallback, useState } from 'react'
import cn, { Argument } from 'classnames'

import { TUnit } from '@store/stat-units'
import { DropdownArrow } from '@ui/dropdown-arrow'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { GlbPagesNames } from '@glb/glb-names'
import { AttributeKinds } from '@service-providers/common'
import { UnitChart } from '../unit-chart'
import { UnitsListUnitName } from './components/units-list-unit-name'

interface IUnitsListUnitProps {
  page: GlbPagesNames
  isDark: boolean
  withChart: boolean
  unit: TUnit
  isModal: boolean | undefined
  className?: Argument
  onSelect: () => void
}

export const UnitsListUnit = ({
  page,
  isDark,
  withChart,
  unit,
  isModal,
  className,
  onSelect,
}: IUnitsListUnitProps): ReactElement => {
  const { kind, name, tooltip } = unit
  const [isChartVisible, setChartVisible] = useState(false)

  const hasChart =
    withChart &&
    ((kind === AttributeKinds.ENUM &&
      unit.variants &&
      unit.variants.length > 0) ||
      (kind === AttributeKinds.NUMERIC &&
        unit.histogram &&
        unit.histogram.length > 0))

  const openCharts = useCallback(
    () => setChartVisible(!!hasChart && !isChartVisible),
    [hasChart, isChartVisible],
  )

  const shouldSHowCharts =
    page !== GlbPagesNames.Refiner && hasChart && isChartVisible

  return (
    <div className={cn(styles.unit, className)}>
      <div className={styles.unitTitle}>
        {unit.power && (
          <PredictionPowerIndicator
            className={styles.unitTitle__power}
            value={unit.power.value}
            comment={unit.power.comment}
          />
        )}
        <UnitsListUnitName
          tooltip={tooltip}
          name={name}
          onClick={onSelect}
          className={cn(
            styles.unitTitle__title,
            isDark && styles.unitTitle__title_dark,
          )}
        />
        {unit.power && !isModal && page === GlbPagesNames.Dtree && (
          <DropdownArrow
            className={cn(
              styles.unitTitle__arrow,
              isDark && styles.unitTitle__arrow_dark,
            )}
            size="sm"
            isOpen={isChartVisible}
            onClick={openCharts}
          />
        )}
      </div>
      {shouldSHowCharts && (
        <UnitChart className="mt-2" unit={unit} page={page} />
      )}
    </div>
  )
}
