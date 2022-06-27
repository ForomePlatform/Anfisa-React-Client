import styles from './units-list.module.css'

import { ReactNode, useState } from 'react'
import cn from 'classnames'

import { TFunctionalUnit, TUnitGroups } from '@store/stat-units'
import { Loader } from '@ui/loader'
import { ProgressBar } from '@ui/progress-bar'
import { TPropertyStatus } from '@service-providers/common'
import { FunctionalUnits } from './functional-units'
import { useFilteredUnits } from './units-lilst.utils'
import { TFunctionalCondition } from './units-list.interface'
import { UnitsListControls } from './units-list-controls'
import { UnitsListGroup } from './units-list-group'

export interface IUnitsListProps {
  className?: string
  isDark?: boolean
  withCharts?: boolean
  fetchedAmount: number
  subHeader?: ReactNode
  groups: TUnitGroups
  functionalUnits: TFunctionalUnit[]
  functionalConditions?: TFunctionalCondition[]
  onSelect: (unit: TPropertyStatus) => void
  onFunctionalConditionSelect?: (condition: TFunctionalCondition) => void
  onFunctionalConditionDelete?: (condition: TFunctionalCondition) => void
  listContainerId?: string
}

export const UnitsList = ({
  className,
  isDark = false,
  withCharts = false,
  subHeader,
  groups,
  functionalUnits,
  functionalConditions,
  fetchedAmount,
  onSelect,
  onFunctionalConditionSelect,
  onFunctionalConditionDelete,
  listContainerId,
}: IUnitsListProps) => {
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([])
  const { filterValue, setFilterValue, filteredGroups } =
    useFilteredUnits(groups)

  const handleCollapsedChange = (collapsed: boolean, groupName: string) => {
    if (collapsed) {
      setCollapsedGroups([...collapsedGroups, groupName])
    } else {
      setCollapsedGroups(collapsedGroups.filter(name => name !== groupName))
    }
  }

  return (
    <div
      className={cn(
        styles.unitsList,
        isDark && styles.unitsList_dark,
        className,
      )}
    >
      {fetchedAmount !== 100 && (
        <div className={styles.unitsList__loader}>
          <ProgressBar status={fetchedAmount} step={10} size="xs" />
        </div>
      )}
      <FunctionalUnits
        className={styles.unitsList__functional}
        units={functionalUnits}
        onSelect={onSelect}
        conditions={functionalConditions}
        onConditionSelect={onFunctionalConditionSelect}
        onConditionDelete={onFunctionalConditionDelete}
      />
      <UnitsListControls
        className={styles.unitsList__controls}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
        onExpand={() => setCollapsedGroups([])}
        onCollapse={() => setCollapsedGroups(groups.map(group => group.name))}
      />
      {subHeader && (
        <div className={styles.unitsList__subHeader}>{subHeader}</div>
      )}
      <div
        className={cn(
          styles.unitsList__list,
          !filteredGroups.length && styles.unitsList__list_empty,
        )}
        id={listContainerId}
      >
        {!filteredGroups.length ? (
          <Loader />
        ) : (
          filteredGroups.map(group => (
            <UnitsListGroup
              key={group.name}
              isCollapsed={collapsedGroups.includes(group.name)}
              onCollapsedChange={handleCollapsedChange}
              isDark={isDark}
              withCharts={withCharts}
              unitsGroup={group}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  )
}
