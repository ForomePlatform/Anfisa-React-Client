import styles from './units-list-unit.module.css'

import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { TUnit } from '@store/stat-units'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { UnitsListUnitName } from './components/units-list-unit-name'

interface IUnitsListUnitProps {
  isDark: boolean
  unit: TUnit
  className?: Argument
  onSelect: () => void
}

export const UnitsListUnit = ({
  isDark,
  unit,
  className,
  onSelect,
}: IUnitsListUnitProps): ReactElement => {
  const { name, tooltip } = unit

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
      </div>
    </div>
  )
}
