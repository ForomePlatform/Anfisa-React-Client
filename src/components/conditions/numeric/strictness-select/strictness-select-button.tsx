import { ReactElement, useMemo } from 'react'
import cn from 'classnames'

import { NumericSelectTypes } from '@core/enum/numeric-select-types-enum'

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
    if (selectType === NumericSelectTypes.Max) {
      return value ? '≤' : '<'
    }

    return value ? '≥' : '>'
  }, [selectType, value])

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
      <span
        className={cn(
          'flex items-center justify-center w-full h-full rounded',
          disabled
            ? 'bg-grey-light text-grey-blue'
            : 'bg-blue-light text-blue-bright',
        )}
      >
        {strictnessSign}
      </span>
    </button>
  )
}
