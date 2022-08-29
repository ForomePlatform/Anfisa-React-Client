import styles from './check-input.module.css'

import { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  checked: boolean
  type: 'checkbox' | 'radio'
  spread?: 's' | 'm'
  id?: string | number
  className?: Argument
  disabled?: boolean
  datatestId?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckInput: FC<ICheckInputProps> = ({
  checked,
  type,
  spread = 's',
  id,
  className,
  disabled,
  datatestId,
  children,
  onChange,
}) => {
  return type === 'radio' ? (
    <label
      htmlFor={id?.toString()}
      className={cn(className, 'cursor-pointer inline-flex items-center')}
    >
      <input
        type="radio"
        id={id?.toString()}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={cn(styles.input, styles[`input_${spread}`])}
      />
      {children}
    </label>
  ) : (
    <label className={cn('inline-flex items-center', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />

      <span
        className={cn(styles.checkmark, disabled && styles.checkmark_disabled)}
      />

      <span
        className={cn(styles.label, disabled && styles.label_disabled)}
        data-testid={datatestId}
      >
        {children}
      </span>
    </label>
  )
}
