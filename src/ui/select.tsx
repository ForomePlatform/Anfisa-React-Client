import { ChangeEvent, MouseEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'

interface ISelectProps {
  placeholder?: string
  className?: Argument
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
  options?: string[]
  reset?: boolean
  value?: any
  disabled?: boolean
  approx?: boolean
  values?: string[]
}

export const Select = observer(({ ...rest }: ISelectProps): ReactElement => {
  const {
    className,
    options,
    reset,
    value,
    disabled,
    approx,
    values,
    ...tempRest
  } = rest

  return (
    <select
      className={cn('border-grey-blue border rounded', className)}
      {...tempRest}
      value={value}
      disabled={disabled}
    >
      {reset && (
        <>
          <option />

          <option value="empty">{t('dtree.empty')}</option>
        </>
      )}

      {options &&
        options.map((option, index) => (
          <option
            key={Math.random()}
            value={approx && values ? values[index] : option}
          >
            {option}
          </option>
        ))}
    </select>
  )
})
