import styles from './dropdown.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { IDropdownCommonProps } from '@components/dropdown/dropdown.interfaces'

interface IDropdownButtonProps extends Required<IDropdownCommonProps> {
  isOpen: boolean
  onToggle: (target: HTMLElement) => void
}

export const DropdownButton = ({
  isOpen,
  onToggle,
  variant,
}: IDropdownButtonProps): ReactElement => {
  return (
    <div
      onClick={e => onToggle(e.currentTarget)}
      className={cn(
        styles.dropdown__button,
        styles[`dropdown__button_${camelCase(variant)}`],
      )}
    >
      Button
    </div>
  )
}
