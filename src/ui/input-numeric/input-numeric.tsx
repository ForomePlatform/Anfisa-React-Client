import styles from './input-numeric.module.css'

import { KeyboardEvent, ReactElement, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
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
  onChange: (e: number) => void
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
  const [inputValue, setInputValue] = useState<number>(+value)
  const minimal = min || 0
  const maximal = max || Infinity
  const valueStep = step || 1
  const displayValue = value === '' ? value : inputValue

  useEffect(() => {
    setInputValue(+value)
  }, [value])

  function changeValue(newValue: number) {
    if (disabled) {
      return
    }
    const isFloatNumber = !!isFloat
    const limitedNum = checkMaxMin(newValue, maximal, minimal)
    const result = isFloatNumber
      ? +limitedNum.toFixed(2)
      : +limitedNum.toFixed(0)
    setInputValue(result)
    onChange(result)
  }

  function increase() {
    changeValue(inputValue + valueStep)
  }

  function decrease() {
    changeValue(inputValue - valueStep)
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
          onValueChange={(v: any) => {
            if (v.floatValue !== inputValue) {
              changeValue(v.floatValue || 0)
            }
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
