import styles from './input-numeric.module.css'

import { ReactElement, useState } from 'react'
import cn, { Argument } from 'classnames'

const KEYCODE_UP: number = 38
const KEYCODE_DOWN: number = 40

interface IInputNumberProps {
  placeholder?: string
  disabled?: boolean
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
  ...rest
}: IInputNumberProps): ReactElement => {
  const [inputValue, setInputValue] = useState<number | string>(value)
  const minimal = min || 0
  const maximal = max || +Infinity

  function getNumeric(value: number | string): number {
    if (isNaN(+value)) {
      return minimal
    }
    if (value <= minimal) {
      return minimal
    }
    if (value >= maximal) {
      return maximal
    }
    return +value
  }

  function changeValue(newValue: number | string) {
    const numeric = getNumeric(newValue)
    setInputValue(numeric)
    onChange(numeric)
  }

  function increase() {
    changeValue(+inputValue + 1)
  }

  function decrease() {
    changeValue(+inputValue - 1)
  }

  function onKeyDown(e: any) {
    if (e.keyCode !== KEYCODE_UP && e.keyCode !== KEYCODE_DOWN) {
      return
    }

    const actions = {
      [KEYCODE_UP]: increase,
      [KEYCODE_DOWN]: decrease,
    }

    e.preventDefault()
    actions[e.keyCode]()
  }

  return (
    <span className={cn(styles.wrapper, className)}>
      <input
        className={cn(styles.input)}
        type="text"
        value={inputValue}
        onChange={e => changeValue(e.target.value)}
        onKeyDown={e => onKeyDown(e)}
        {...rest}
      />
      <b className={cn(styles.button)} onClick={() => increase()}>
        +
      </b>
      <b className={cn(styles.button)} onClick={() => decrease()}>
        -
      </b>
    </span>
  )
}
