import styles from './widget-sub-tab.module.css'

import { memo, ReactElement, useEffect, useMemo } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { UnitChart } from '@components/units-list/unit-chart'
import dashboardStore from '@pages/filter/common/dashboard'
import {
  AttributeKinds,
  IEnumPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'
import { IWidgetSubTabProps } from '../../../../../dashboard.interfaces'
import { WidgetSubTabEnum } from './components/widget-sub-tab-enum'
import { WidgetSubTabNumeric } from './components/widget-sub-tab-numeric'

export const WidgetSubTab = memo(
  ({
    unit,
    id,
    tabIndex,
    disabled,
    isAllTabsOpened,
    isUnitOpened,
    showInCharts,
    onChangeSubTabHeight,
  }: IWidgetSubTabProps): ReactElement => {
    const [isSubTabOpened, openSubTab, closeSubTab] = useToggle(isUnitOpened)

    const handleToggleUnit = () => {
      if (isUnitOpened) {
        unit.isOpen = false
        closeSubTab()
        onChangeSubTabHeight({ index: tabIndex, id, isOpen: isUnitOpened })
      } else {
        unit.isOpen = true
        openSubTab()
        setTimeout(
          () =>
            onChangeSubTabHeight({
              index: tabIndex,
              id,
              isOpen: isUnitOpened,
            }),
          0,
        )
      }
    }

    useEffect(() => {
      unit.isOpen = isAllTabsOpened
      isAllTabsOpened ? openSubTab() : closeSubTab()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllTabsOpened])

    useEffect(() => {
      unit.isOpen = isUnitOpened
      isUnitOpened ? openSubTab() : closeSubTab()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUnitOpened])

    const renderUnit = () => {
      switch (unit.kind) {
        case AttributeKinds.ENUM:
          return <WidgetSubTabEnum unit={unit as IEnumPropertyStatus} />
        case AttributeKinds.NUMERIC:
          return <WidgetSubTabNumeric unit={unit as INumericPropertyStatus} />
        default:
          return null
      }
    }

    const predictionPowerValue = useMemo(() => {
      if ('power' in unit) {
        return unit.power?.value
      }
      return 0
    }, [unit])

    return (
      <div
        className={cn(styles.subTab, disabled && styles.subTab_disabled)}
        id={id}
      >
        <div className={styles.subTab__header}>
          <div
            className="flex items-center"
            onClick={() => dashboardStore.selectGroup(unit)}
          >
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
            name={isSubTabOpened ? 'ArrowDownS' : 'ArrowUpS'}
            className="h-4 text-white hover:text-blue-bright cursor-pointer"
            onClick={handleToggleUnit}
          />
        </div>

        {isSubTabOpened && (
          <div className={styles.subTab__unitContainer}>
            {showInCharts ? (
              <UnitChart
                unit={unit}
                className={styles.subTab__unitContainer__chartContainer}
              />
            ) : (
              renderUnit()
            )}
          </div>
        )}
      </div>
    )
  },
)
