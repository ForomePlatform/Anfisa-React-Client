import styles from '../widget-sub-tab.module.css'

import { Fragment, ReactElement, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dashboardStore from '@pages/filter/common/dashboard'
import { MAX_SUB_TAB_ROWS_AMOUNT } from '@pages/filter/common/dashboard/dashboard.constants'
import { IEnumPropertyStatus } from '@service-providers/common'

interface IWidgetSubTabEnumProps {
  unit: IEnumPropertyStatus
  onSelectUnit: () => void
}

export const WidgetSubTabEnum = observer(
  ({ unit, onSelectUnit }: IWidgetSubTabEnumProps): ReactElement => {
    const variantsLeft = unit.variants
      ? unit.variants.length - MAX_SUB_TAB_ROWS_AMOUNT
      : null

    const handleOpenEnumDialog = (variantName: string) => {
      dashboardStore.setEnumVariant(variantName)
      onSelectUnit()
    }

    const isEmptyTab = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return unit.variants?.every(([_name, value]) => value === 0)
    }, [unit.variants])

    if (isEmptyTab) {
      return (
        <div className="text-white text-12">
          {t('dashboard.emptyCondition')}
        </div>
      )
    }

    return (
      <>
        {unit.variants?.slice(0, MAX_SUB_TAB_ROWS_AMOUNT + 1).map(
          ([variantName, variantValue]: any, index: number) =>
            variantValue > 0 && (
              <Fragment key={variantName + variantValue}>
                <div className={styles.subTab__unitContainer__unit}>
                  <div
                    className={styles.subTab__unitContainer__unit__name}
                    onClick={() => handleOpenEnumDialog(variantName)}
                  >
                    {variantName}
                  </div>

                  <div className={styles.subTab__unitContainer__unit__value}>
                    {variantValue} {variantValue > 1 ? 'variants' : 'variant'}
                  </div>
                </div>

                {index === 40 && (
                  <div className={styles.subTab__footer}>
                    {t('dashboard.shownFirst40', { variantsLeft })}
                  </div>
                )}
              </Fragment>
            ),
        )}
      </>
    )
  },
)
