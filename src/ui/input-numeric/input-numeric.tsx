import styles from './input-numeric.module.css'

import { ReactElement, useState } from 'react'
import cn, { Argument } from 'classnames'

const KEYCODE_UP: number = 38
const KEYCODE_DOWN: number = 40

interface IInputNumberProps {
  value: string | number
  className?: Argument
  onChange: (e: number) => void
  min?: number
  max?: number
}

export const InputNumeric = ({
  className,
  value,
  min,
  max,
  onChange,
}: IInputNumberProps): ReactElement => {
  const [inputValue, setInputValue] = useState<number>(+value)
  const minimal = min || 0
  const maximal = max || Infinity
  const displayValue = inputValue.toLocaleString()

  function getNumeric(value: number | string): number {
    const num = typeof value === 'string' ? +value.replace(/\s/g, '') : value
    if (isNaN(num)) {
      return minimal
    }
    if (num <= minimal) {
      return minimal
    }
    if (num >= maximal) {
      return maximal
    }
    return num
  }

  function changeValue(newValue: number | string) {
    const numeric = getNumeric(newValue)
    setInputValue(numeric)
    onChange(numeric)
  }

  function increase() {
    changeValue(inputValue + 1)
  }

  function decrease() {
    changeValue(inputValue - 1)
  }

  function onKeyDown(e: any) {
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
    <div className={cn(styles.wrapper, className)}>
      <div className={cn(styles.inputSection)}>
        <input
          className={cn(styles.input)}
          type="text"
          value={displayValue}
          onChange={e => changeValue(e.target.value)}
          onKeyDown={e => onKeyDown(e)}
        />
      </div>
      <div className={cn(styles.buttons)}>
        <b className={cn(styles.button)} onClick={() => increase()}>
          +
        </b>
        <b className={cn(styles.button)} onClick={() => decrease()}>
          –
        </b>
      </div>
    </div>
  )
}
