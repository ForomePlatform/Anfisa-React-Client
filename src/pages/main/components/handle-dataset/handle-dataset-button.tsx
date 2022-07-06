import styles from '../sidebar/datasets.module.css'

import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

export const HandleDatasetButton = ({
  onShowPopover,
}: IPopoverButtonBaseProps) => {
  return (
    <button
      onClick={e => onShowPopover(e.currentTarget)}
      className={styles.datasets__header__button}
    >
      <Icon name="Options" />
    </button>
  )
}
