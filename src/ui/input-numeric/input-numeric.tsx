import styles from './input-numeric.module.css'

import { KeyboardEvent, ReactElement, useEffect, useState } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import cn, { Argument } from 'classnames'

import { formatNumber } from '@core/format-number'
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
  onChange: (e: number | null) => void
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
  const [inputValue, setInputValue] = useState<number | null>(+value)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const minimal = min || 0
  const maximal = max || Infinity
  const valueStep = step || 1
  const displayValue = value === '' ? value : inputValue
  let enteredNumber: number | null = inputValue ?? null

  useEffect(() => {
    setInputValue(+value)
  }, [value])

  function checkValue(value: number): number {
    const limitedNum = checkMaxMin(value, maximal, minimal)
    return isFloat
      ? +formatNumber(limitedNum).replace(',', '.')
      : +limitedNum.toFixed(0)
  }

  function changeValue(newValue: number | null) {
    if (disabled) {
      return
    }

    const result = newValue === null ? null : checkValue(newValue)
    setInputValue(result)
    onChange(result)
  }

  function increase() {
    const oldValue = inputValue ?? 0
    changeValue(oldValue + valueStep)
  }

  function decrease() {
    const oldValue = inputValue ?? 0
    changeValue(oldValue - valueStep)
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
          value={displayValue}
          disabled={disabled}
          thousandSeparator={' '}
          onValueChange={(value: NumberFormatValues) => {
            if (value.floatValue !== inputValue) {
              enteredNumber = value.floatValue ?? null
            }
          }}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            changeValue(enteredNumber)
            setIsFocused(false)
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
