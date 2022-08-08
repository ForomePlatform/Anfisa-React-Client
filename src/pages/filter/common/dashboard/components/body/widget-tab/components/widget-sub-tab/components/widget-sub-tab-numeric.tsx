import styles from '../widget-sub-tab.module.css'

import { ReactElement } from 'react'

import { IWidgetSubTabNumericProps } from '@pages/filter/common/dashboard/dashboard.interfaces'

export const WidgetSubTabNumeric = ({
  unit,
  onSelectUnit,
}: IWidgetSubTabNumericProps): ReactElement => (
  <div className={styles.subTab__unitContainer__unit}>
    <div
      className={styles.subTab__unitContainer__unit__name}
      onClick={() => onSelectUnit(unit)}
    >{`${unit.min} \u2264 ... \u2264 ${unit.max}`}</div>
  </div>
)
