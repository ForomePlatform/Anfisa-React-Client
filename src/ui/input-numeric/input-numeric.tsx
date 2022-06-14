import styles from './input-numeric.module.css'

import { KeyboardEvent, ReactElement, useState } from 'react'
import cn, { Argument } from 'classnames'

import { getNumeric } from './input-numeric.utils'

const KEYCODE_UP: number = 38
const KEYCODE_DOWN: number = 40

interface IInputNumericProps {
  value: string | number
  className?: Argument
  min?: number
  max?: number
  disabled?: boolean
  hasErrors?: boolean
  onChange: (e: number) => void
}

export const InputNumeric = ({
  className,
  value,
  min,
  max,
  disabled,
  hasErrors,
  onChange,
}: IInputNumericProps): ReactElement => {
  const [inputValue, setInputValue] = useState<number>(+value)
  const minimal = min || 0
  const maximal = max || Infinity
  const displayValue = inputValue.toLocaleString()

  function changeValue(newValue: number | string) {
    if (disabled) {
      return
    }
    const numeric = getNumeric(newValue, minimal, maximal)
    setInputValue(numeric)
    onChange(numeric)
  }

  function increase() {
    changeValue(inputValue + 1)
  }

  function decrease() {
    changeValue(inputValue - 1)
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
        <input
          className={cn(styles.inputNumeric__input)}
          type="text"
          value={displayValue}
          disabled={disabled}
          onChange={e => changeValue(e.target.value)}
          onKeyDown={onKeyDown}
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
