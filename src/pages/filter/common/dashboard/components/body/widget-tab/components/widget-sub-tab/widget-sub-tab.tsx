import styles from './widget-sub-tab.module.css'

import { Fragment, ReactElement, useEffect } from 'react'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { PredictionPowerIndicator } from '@components/prediction-power-indicator'
import { AttributeKinds } from '@service-providers/common'
import { IWidgetSubTabProps } from '../../../../../dashboard.interfaces'
import { WidgetSubTabEnum } from './components/widget-sub-tab-enum'
import { WidgetSubTabNumeric } from './components/widget-sub-tab-numeric'

export const WidgetSubTab = ({
  unit,
  id,
  tabIndex,
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

  const renderEnumUnit = () => {
    const variantsLeft = unit.variants.length - 40

    return unit.variants?.map(
      ([variantName, variantValue]: any, index: number) => (
        <Fragment key={variantName + variantValue}>
          {index < 41 && (
            <WidgetSubTabEnum
              variantName={variantName}
              variantValue={variantValue}
            />
          )}

          {index === 40 && (
            <div className={styles.subTab__footer}>
              {t('dashboard.shownFirst40', { variantsLeft })}
            </div>
          )}
        </Fragment>
      ),
    )
  }

  const renderNumericUnit = () => {
    return <WidgetSubTabNumeric min={unit.min} max={unit.max} />
  }

  return (
    <div className={styles.subTab} id={id}>
      <div className={styles.subTab__header}>
        <div className="flex items-center">
          <PredictionPowerIndicator className="mr-2 rounded" value={0} />

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
