import styles from './input-numeric.module.css'

import { KeyboardEvent, ReactElement, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import cn, { Argument } from 'classnames'

import { checkMaxMin } from './input-numeric.utils'

const KEYCODE_UP: number = 38
const KEYCODE_DOWN: number = 40

interface IInputNumericProps {
  value: string | number
  className?: Argument
  placeholder?: string
  min?: number
  max?: number
  step?: number
  isFloat?: boolean
  disabled?: boolean
  hasErrors?: boolean
  onChange: (value: number | null) => void
}

export const InputNumeric = ({
  className,
  value,
  min,
  max,
  step,
  isFloat,
  disabled,
  hasErrors,
  onChange,
  ...rest
}: IInputNumericProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>(value.toString())
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const minimal = min || 0
  const maximal = max || Infinity
  const valueStep = step || 1

  function checkValue(value: number): number {
    const num = isFloat ? value.toPrecision(12) : value
    return checkMaxMin(+num, maximal, minimal)
  }

  function changeValue(newValue: number | null) {
    if (disabled) {
      return
    }

    const result = newValue === null ? '' : checkValue(newValue)
    setInputValue(result.toString())
    onChange(+result)
  }

  function increase() {
    const oldValue = inputValue ?? 0
    changeValue(+oldValue + valueStep)
  }

  function decrease() {
    const oldValue = inputValue ?? 0
    changeValue(+oldValue - valueStep)
  }

  function onKeyDown(e: KeyboardEvent) {
    const actions = {
      [KEYCODE_UP]: increase,
      [KEYCODE_DOWN]: decrease,
    }

    if (!actions[e.keyCode]) {
      return
    }

    e.preventDefault()
    actions[e.keyCode]()
  }

  return (
    <div
      className={cn(
        styles.inputNumeric,
        className,
        disabled && styles.inputNumeric_disabled,
        isFocused && styles.inputNumeric_focused,
        hasErrors && styles.inputNumeric_hasErrors,
      )}
    >
      <div className={cn(styles.inputNumeric__inputSection)}>
        <NumberFormat
          className={cn(styles.inputNumeric__input)}
          type="text"
          value={inputValue || null}
          disabled={disabled}
          thousandSeparator={' '}
          onValueChange={(value: NumberFormatValues) => {
            if (typeof value.floatValue === 'number') {
              changeValue(value.floatValue)
            }
          }}
          onFocus={() => {
            setIsFocused(true)
          }}
          onKeyDown={onKeyDown}
          {...rest}
        />
      </div>
      <div className={cn(styles.inputNumeric__buttons)}>
        <b className={cn(styles.inputNumeric__button)} onClick={increase}>
          +
        </b>
        <b className={cn(styles.inputNumeric__button)} onClick={decrease}>
          –
        </b>
      </div>
      {hasErrors && <div className={cn(styles.inputNumeric__error)}>Error</div>}
    </div>
  )
}
