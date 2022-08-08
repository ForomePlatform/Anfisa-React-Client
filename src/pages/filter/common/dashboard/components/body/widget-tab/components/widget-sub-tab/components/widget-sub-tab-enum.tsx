import styles from '../widget-sub-tab.module.css'

import { Fragment, ReactElement } from 'react'

import { t } from '@i18n'
import { MAX_SUB_TAB_ROWS_AMOUNT } from '@pages/filter/common/dashboard/dashboard.constants'
import { IEnumPropertyStatus } from '@service-providers/common'

interface IWidgetSubTabEnumProps {
  unit: IEnumPropertyStatus
}

export const WidgetSubTabEnum = ({
  unit,
}: IWidgetSubTabEnumProps): ReactElement => {
  const variantsLeft = unit.variants
    ? unit.variants.length - MAX_SUB_TAB_ROWS_AMOUNT
    : null

  return (
    <>
      {unit.variants?.map(
        ([variantName, variantValue]: any, index: number) =>
          variantValue > 0 && (
            <Fragment key={variantName + variantValue}>
              {index < MAX_SUB_TAB_ROWS_AMOUNT && (
                <div className={styles.subTab__unitContainer__unit}>
                  <div className={styles.subTab__unitContainer__unit__name}>
                    {variantName}
                  </div>

                  <div className={styles.subTab__unitContainer__unit__value}>
                    {variantValue} {variantValue > 1 ? 'variants' : 'variant'}
                  </div>
                </div>
              )}

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
}
