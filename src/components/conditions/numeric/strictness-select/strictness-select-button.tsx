import { ReactElement, useMemo } from 'react'
import cn from 'classnames'

import { NumericSelectTypes } from '@core/enum/numeric-select-types-enum'
import { Icon } from '@ui/icon'

interface IStrictnessSelectButtonProps {
  value: boolean
  selectType: NumericSelectTypes
  onChange: (newValue: boolean) => void
  disabled?: boolean
}

export const StrictnessSelectButton = ({
  disabled,
  value,
  selectType,
  onChange,
}: IStrictnessSelectButtonProps): ReactElement => {
  const strictnessSign = useMemo(() => {
    return value ? <Icon name="LessOrEqualThan" /> : <Icon name="LessThan" />
  }, [value])

  const signDirection = useMemo(() => {
    return selectType === NumericSelectTypes.Min ? 'scale(-1,1)' : ''
  }, [selectType])

  return (
    <button
      className={cn(
        'flex items-center h-8 w-8 p-1 rounded bg-white border border-grey-disabled shadow-input',
        disabled
          ? 'text-grey-blue'
          : 'cursor-pointer text-black  hover:text-blue-bright',
      )}
      onClick={() => onChange(value ? false : true)}
    >
      <div
        style={{ transform: signDirection }}
        className={cn(
          'flex items-center justify-center w-full h-full rounded',
          disabled
            ? 'bg-grey-light text-grey-blue'
            : 'bg-blue-light text-blue-bright',
        )}
      >
        {strictnessSign}
      </div>
    </button>
  )
}
