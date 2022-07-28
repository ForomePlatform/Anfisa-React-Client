import styles from './dashboard-body.module.css'

import { ReactElement, useEffect } from 'react'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { WidgetSubTabUnit } from './widget-sub-tab-unit'

// TODO: fix any type
export interface IWidgetSubTabProps {
  unit: any
  isAllTabsOpened: boolean
}

export const WidgetSubTab = ({
  unit,
  isAllTabsOpened,
}: IWidgetSubTabProps): ReactElement => {
  const [isUnitOpened, openUnit, closeUnit] = useToggle(false)

  const toggleUnit = () => {
    isUnitOpened ? closeUnit() : openUnit()
  }

  useEffect(() => {
    isAllTabsOpened ? openUnit() : closeUnit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllTabsOpened])

  return (
    <>
      <div className={styles.body__subTab}>
        <div className={styles.body__subTab__header}>
          <div className="flex items-center">
            <PredictionPowerIndicator className="mr-2 rounded" value={0} />

            <div className={styles.body__subTab__header__title}>
              {unit.name}
            </div>
          </div>

          <Icon
            name={isUnitOpened ? 'ArrowDownS' : 'ArrowUpS'}
            className="text-white hover:text-blue-bright cursor-pointer"
            onClick={toggleUnit}
          />
        </div>

        {isUnitOpened && (
          <div className="w-full flex justify-start flex-wrap pl-1 flex-column">
            {unit.variants?.map(([variantName, variantValue]: any) => (
              <WidgetSubTabUnit
                key={variantName + variantValue}
                variantName={variantName}
                variantValue={variantValue}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
