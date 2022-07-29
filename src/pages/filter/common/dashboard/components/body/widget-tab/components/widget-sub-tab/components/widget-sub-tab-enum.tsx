import styles from '../widget-sub-tab.module.css'

import { ReactElement } from 'react'

import { IWidgetSubTabEnumProps } from '@pages/filter/common/dashboard/dashboard.interfaces'

export const WidgetSubTabEnum = ({
  variantName,
  variantValue,
}: IWidgetSubTabEnumProps): ReactElement => (
  <div className={styles.subTab__unitContainer__unit}>
    <div className={styles.subTab__unitContainer__unit__name}>
      {variantName}
    </div>

    <div className={styles.subTab__unitContainer__unit__value}>
      {variantValue} {variantValue > 1 ? 'variants' : 'variant'}
    </div>
  </div>
)
