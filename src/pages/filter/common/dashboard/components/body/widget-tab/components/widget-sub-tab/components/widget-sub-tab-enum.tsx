import styles from '../widget-sub-tab.module.css'

import { Fragment, ReactElement } from 'react'

import { t } from '@i18n'
import { IWidgetSubTabEnumProps } from '@pages/filter/common/dashboard/dashboard.interfaces'

export const WidgetSubTabEnum = ({
  unit,
}: IWidgetSubTabEnumProps): ReactElement => {
  const variantsLeft = unit.variants ? unit.variants.length - 40 : null

  return (
    <>
      {unit.variants?.map(([variantName, variantValue]: any, index: number) => (
        <Fragment key={variantName + variantValue}>
          {index < 41 && (
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
      ))}
    </>
  )
}
