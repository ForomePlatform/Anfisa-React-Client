import styles from '../widget-sub-tab.module.css'

import { ReactElement } from 'react'

import { INumericPropertyStatus } from '@service-providers/common'

interface IWidgetSubTabNumericProps {
  unit: INumericPropertyStatus
  onSelectUnit: () => void
}

export const WidgetSubTabNumeric = ({
  unit,
  onSelectUnit,
}: IWidgetSubTabNumericProps): ReactElement => (
  <div className={styles.subTab__unitContainer__unit}>
    <div
      className={styles.subTab__unitContainer__unit__name}
      onClick={onSelectUnit}
    >{`${unit.min} \u2264 ... \u2264 ${unit.max}`}</div>
  </div>
)
