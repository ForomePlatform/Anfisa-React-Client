import styles from './units-list-group.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { TUnitGroup } from '@store/stat-units'
import { DropdownArrow } from '@ui/dropdown-arrow'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { GlbPagesNames } from '@glb/glb-names'
import { TPropertyStatus } from '@service-providers/common'
import { UnitsListUnit } from '../units-list-unit'

interface IUnitsListGroupProps {
  page: GlbPagesNames
  isCollapsed: boolean
  isDark: boolean
  withCharts: boolean
  unitsGroup: TUnitGroup
  isModal: boolean | undefined
  className?: string
  onCollapsedChange: (isCollapsed: boolean, name: string) => void
  onSelect: (unit: TPropertyStatus) => void
}

export const UnitsListGroup = ({
  page,
  isCollapsed,
  isDark,
  withCharts,
  unitsGroup,
  isModal,
  className,
  onCollapsedChange,
  onSelect,
}: IUnitsListGroupProps): ReactElement => {
  const { power, name, attributes = [] } = unitsGroup

  return (
    <div className={className}>
      <div
        data-testid={DecisionTreesResultsDataCy.unitGroupName}
        onClick={() => onCollapsedChange(!isCollapsed, name)}
        className={cn(
          styles.groupHeader,
          isDark && styles.groupHeader_dark,
          isCollapsed && styles.groupHeader_collapsed,
        )}
      >
        {power !== undefined && (
          <PredictionPowerIndicator className="mr-2" value={power} />
        )}
        <span className={styles.groupHeader__title}>{name}</span>
        <DropdownArrow isOpen={!isCollapsed} dark={!isDark} />
      </div>
      {!isCollapsed &&
        attributes.map(unit => (
          <UnitsListUnit
            key={unit.name}
            page={page}
            unit={unit}
            isDark={isDark}
            withChart={withCharts}
            isModal={isModal}
            onSelect={() => onSelect(unit)}
          />
        ))}
    </div>
  )
}
