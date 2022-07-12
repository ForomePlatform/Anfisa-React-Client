import { ReactElement } from 'react'
import cn from 'classnames'

import { ConditionJoinMode } from '@service-providers/common'

interface IConditionJoinModeLabelProps {
  className?: string
  mode: ConditionJoinMode | undefined
}

export const ConditionJoinModeLabel = ({
  className,
  mode,
}: IConditionJoinModeLabelProps): ReactElement | null => {
  const baseClassName =
    'inline-block px-1 text-10 leading-16 font-normal rounded-sm'

  switch (mode) {
    case ConditionJoinMode.AND:
      return (
        <span
          className={cn(
            baseClassName,
            'bg-green-medium  text-green-secondary',
            className,
          )}
        >
          all
        </span>
      )

    case ConditionJoinMode.NOT:
      return (
        <span
          className={cn(
            baseClassName,
            'bg-red-lighter text-red-secondary',
            className,
          )}
        >
          not
        </span>
      )
  }

  return null
}
