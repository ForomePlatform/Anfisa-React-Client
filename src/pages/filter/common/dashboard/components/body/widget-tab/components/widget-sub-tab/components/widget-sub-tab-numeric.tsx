import styles from '../widget-sub-tab.module.css'

import { ReactElement } from 'react'

import { IWidgetSubTabNumericProps } from '@pages/filter/common/dashboard/dashboard.interfaces'

export const WidgetSubTabNumeric = ({
  min,
  max,
}: IWidgetSubTabNumericProps): ReactElement => (
  <div className={styles.subTab__unitContainer__unit}>
    <div>{`${min} \u2264 ... \u2264 ${max}`}</div>
  </div>
)
