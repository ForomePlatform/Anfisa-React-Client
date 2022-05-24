import styles from './change-variant-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'

interface IChangeVariantButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'up' | 'down'
}

export const ChangeVariantButton = ({
  className,
  direction,
  ...buttonProps
}: IChangeVariantButtonProps): ReactElement => {
  return (
    <button
      className={cn(styles.changeVariantButton, className)}
      {...buttonProps}
    >
      <Icon
        name="Arrow"
        className={cn(styles[`changeVariantButton__icon_${direction}`])}
      />
    </button>
  )
}
