import styles from './input.module.css'

import {
  ChangeEvent,
  CSSProperties,
  FC,
  FocusEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react'
import cn, { Argument } from 'classnames'

import { Icon } from '@ui/icon'

export interface IInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  foundItems?: number
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  label?: string
  error?: string
  variant?: 'primary' | 'primary-dark'
  size?: 's' | 'm'
  shape?: 'brick' | 'round'
  prepend?: ReactNode
  append?: ReactNode
  className?: Argument
  dataTestId?: string
  style?: CSSProperties
}

export const Input: FC<IInputProps> = ({
  onChange,
  onFocus,
  disabled,
  foundItems,
  type = 'text',
  value,
  label,
  prepend,
  append,
  variant = 'primary',
  shape = 'round',
  error = '',
  size = 's',
  placeholder = '',
  className,
  dataTestId = '',
  style = {},
}) => {
  const appendContainer = useRef<HTMLDivElement>(null)
  const prependContainer = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const inputClassName = cn(
    styles.input,
    styles[`input_shape_${shape}`],
    styles[`input_variant_${variant}`],
    styles[`input_size_${size}`],
    error && styles.input_error,
    className,
  )

  const inputContainerClassName = cn(
    styles.input__container,
    styles.input__container__elementsPlace,
    styles[`input__container__elementsPlace_size_${size}`],
  )

  const showAppend = append || value

  const onClear = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = ''

    if (onChange) {
      onChange(e)
    }
  }

  useLayoutEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    if (showAppend) {
      input.style.paddingRight = `${
        (appendContainer.current?.clientWidth || 0) + 22
      }px`
    }

    if (prepend) {
      input.style.paddingLeft = `${
        (prependContainer.current?.clientWidth || 0) + 22
      }px`
    }
  }, [
    prepend,
    showAppend,
    prependContainer,
    appendContainer,
    foundItems,
    value,
  ])

  return (
    <div className={styles.input__container}>
      {!!label && (
        <span
          className={cn(
            styles.input__labelTitle,
            styles[`input__labelTitle_${size}`],
          )}
        >
          {label}
        </span>
      )}
      <div className={inputContainerClassName}>
        {prepend && (
          <div
            ref={prependContainer}
            className={cn(
              styles.input__icon_container,
              styles[`input__icon_container_${variant}`],
              styles.input__icon_container_left,
            )}
          >
            {prepend}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
          value={value}
          className={inputClassName}
          style={style}
          data-test-id={dataTestId}
        />
        {showAppend && (
          <div
            ref={appendContainer}
            className={cn(
              styles.input__icon_container,
              styles[`input__icon_container_${variant}`],
              styles.input__icon_container_right,
            )}
          >
            {!!foundItems && !!value && (
              <span className={styles.input__icon_container__text}>
                {foundItems} found
              </span>
            )}
            {value && (
              <Icon
                name="Close"
                size={16}
                className={cn(
                  styles.iconClose,
                  disabled && styles.iconClose_disabled,
                  append && styles.iconClose_withIcon,
                )}
                onClick={disabled ? undefined : onClear}
              />
            )}
            {append && append}
          </div>
        )}
      </div>
      {error && <span className={styles.input__errorTitle}>{error}</span>}
    </div>
  )
}
