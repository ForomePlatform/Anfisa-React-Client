import styles from './widget-sub-tab.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { Icon } from '@ui/icon'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { UnitChart } from '@components/units-list/unit-chart'
import dashboardStore from '@pages/filter/common/dashboard'
import { WidgetSubTabItem } from '@pages/filter/common/dashboard/components/body/widget-tab/components/widget-sub-tab/components/widget-sub-tab-item'
import { IExtendedUnit } from '@pages/filter/common/dashboard/dashboard.interfaces'
import { subTabId } from '@pages/filter/common/dashboard/dashboard.utils'
import { AttributeKinds } from '@service-providers/common'

export interface IWidgetSubTabProps {
  unit: IExtendedUnit
  index: number
  groupName: string
}

export const WidgetSubTab = observer(
  ({ unit, groupName }: IWidgetSubTabProps): ReactElement => {
    const { showInCharts, filterValue, toggleUnit } = dashboardStore

    const disabled = !unit.name.includes(filterValue)

    const predictionPowerValue = useMemo(() => {
      if ('power' in unit) {
        return unit.power?.value
      }
      return 0
    }, [unit])

    const onSelectUnit = () => {
      dashboardStore.selectGroup(unit)
    }

    return (
      <div
        className={cn(styles.subTab, disabled && styles.subTab_disabled)}
        id={subTabId(unit.name)}
      >
        <div className={styles.subTab__header}>
          <div className="flex items-center" onClick={onSelectUnit}>
            {unit.kind !== AttributeKinds.FUNC && (
              <PredictionPowerIndicator
                className="mr-2 rounded"
                value={predictionPowerValue || 0}
              />
            )}

            <div className={cn(styles.subTab__header__title, '')}>
              {unit.name}
            </div>
          </div>

          <Icon
            name={unit.isOpen ? 'ArrowDownS' : 'ArrowUpS'}
            className="h-4 text-white hover:text-blue-bright cursor-pointer"
            onClick={() => toggleUnit(unit.name, groupName)}
          />
        </div>

        {unit.isOpen && (
          <div className={styles.subTab__unitContainer}>
            {showInCharts ? (
              <UnitChart
                unit={unit}
                className={styles.subTab__unitContainer__chartContainer}
              />
            ) : (
              <WidgetSubTabItem unit={unit} onSelectUnit={onSelectUnit} />
            )}
          </div>
        )}
      </div>
    )
  },
)