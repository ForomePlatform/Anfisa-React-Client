import styles from './dropdown-clear-all-menu.module.css'

import { FC } from 'react'

interface IDropdownClearAllMenuProps {
  count: number
  clearAll: () => void
}

export const DropdownClearAllMenu: FC<IDropdownClearAllMenuProps> = ({
  count,
  clearAll,
}) => (
  <div className={styles.dropdownClearAllMenu}>
    <div className={styles.dropdownClearAllMenu__text}>{count} selected</div>
    <button onClick={clearAll} className={styles.dropdownClearAllMenu__button}>
      Clear all
    </button>
  </div>
)
