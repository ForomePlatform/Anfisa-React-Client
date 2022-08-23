import styles from './units-list-unit.module.css'

import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { TUnit } from '@store/stat-units'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { UnitsListUnitName } from './components/units-list-unit-name'

interface IUnitsListUnitProps {
  className?: Argument
  isDark: boolean
  unit: TUnit
  isSelected: boolean
  onSelect: () => void
}

export const UnitsListUnit = ({
  className,
  isDark,
  unit,
  isSelected,
  onSelect,
}: IUnitsListUnitProps): ReactElement => {
  const { name, tooltip } = unit

  return (
    <div
      className={cn(
        styles.unit,
        className,
        isSelected ? styles.unit_selected : '',
      )}
    >
      <div className={styles.unitTitle}>
        <div className={cn(styles.unitTitle__powerWrapper)}>
          {unit.power && (
            <PredictionPowerIndicator
              value={unit.power.value}
              comment={unit.power.comment}
            />
          )}
        </div>
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
