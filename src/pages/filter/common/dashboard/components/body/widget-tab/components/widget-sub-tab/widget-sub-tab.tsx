import styles from './widget-sub-tab.module.css'

import { ReactElement, useEffect, useMemo } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import {
  AttributeKinds,
  IEnumPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'
import { IWidgetSubTabProps } from '../../../../../dashboard.interfaces'
import { WidgetSubTabEnum } from './components/widget-sub-tab-enum'
import { WidgetSubTabNumeric } from './components/widget-sub-tab-numeric'

export const WidgetSubTab = ({
  unit,
  id,
  tabIndex,
  isUnitInSearch,
  isAllTabsOpened,
  onChangeSubTabHeight,
}: IWidgetSubTabProps): ReactElement => {
  const [isUnitOpened, openUnit, closeUnit] = useToggle(false)

  const handleToggleUnit = () => {
    if (isUnitOpened) {
      closeUnit()
      onChangeSubTabHeight({ index: tabIndex, id, isOpen: isUnitOpened })
    } else {
      openUnit()
      setTimeout(
        () =>
          onChangeSubTabHeight({ index: tabIndex, id, isOpen: isUnitOpened }),
        0,
      )
    }
  }

  useEffect(() => {
    isAllTabsOpened ? openUnit() : closeUnit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllTabsOpened])

  const renderEnumUnit = () => (
    <WidgetSubTabEnum unit={unit as IEnumPropertyStatus} />
  )

  const renderNumericUnit = () => (
    <WidgetSubTabNumeric unit={unit as INumericPropertyStatus} />
  )

  const predictionPowerValue = useMemo(() => {
    if ('power' in unit) {
      return unit.power?.value
    }
    return 0
  }, [unit])

  return (
    <div
      className={cn(styles.subTab, !isUnitInSearch && styles.subTab_disabled)}
      id={id}
    >
      <div className={styles.subTab__header}>
        <div className="flex items-center">
          {unit.kind !== AttributeKinds.FUNC && (
            <PredictionPowerIndicator
              className="mr-2 rounded"
              value={predictionPowerValue || 0}
            />
          )}

          <div className={styles.subTab__header__title}>{unit.name}</div>
        </div>

        <Icon
          name={isUnitOpened ? 'ArrowDownS' : 'ArrowUpS'}
          className="h-4 text-white hover:text-blue-bright cursor-pointer"
          onClick={handleToggleUnit}
        />
      </div>

      {isUnitOpened && (
        <div className={styles.subTab__unitContainer}>
          {unit.kind === AttributeKinds.ENUM && renderEnumUnit()}
          {unit.kind === AttributeKinds.NUMERIC && renderNumericUnit()}
        </div>
      )}
    </div>
  )
}
