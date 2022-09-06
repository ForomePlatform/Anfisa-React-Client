import { ReactElement, useMemo } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'

interface IStrictnessSelectButtonProps {
  value: boolean
  onChange: (newValue: boolean) => void
  disabled?: boolean
}

export const StrictnessSelectButton = ({
  disabled,
  value,
  onChange,
}: IStrictnessSelectButtonProps): ReactElement => {
  const strictnessSign = useMemo(() => {
    return value ? <Icon name="LessOrEqualThan" /> : <Icon name="LessThan" />
  }, [value])

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
