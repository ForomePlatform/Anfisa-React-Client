import styles from './dropdown.module.css'

import { MouseEvent, PropsWithChildren, ReactElement } from 'react'
import cn from 'classnames'
import { camelCase } from 'lodash'

import { IDropdownCommonProps } from '@components/dropdown/dropdown.interfaces'

interface IDropdownMenuItemProps extends Required<IDropdownCommonProps> {
  disabled?: boolean
  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

export const DropdownMenuItem = ({
  variant,
  children,
  disabled,
  onClick,
}: PropsWithChildren<IDropdownMenuItemProps>): ReactElement => {
  return (
    <div
      className={cn(
        styles.dropdown__menu__item,
        styles[`dropdown__menu__item_${camelCase(variant)}`],
        disabled &&
          styles[`dropdown__menu__item_${camelCase(variant)}_disabled`],
      )}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  )
}
