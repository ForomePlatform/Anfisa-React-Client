import { ReactElement, RefObject } from 'react'

import { Icon } from '@ui/icon'

interface IConditionModalOptionsButtonProps {
  refEl: RefObject<HTMLButtonElement>
  onClick?: () => void
}

export const ConditionModalOptionsButton = ({
  refEl,
  ...rest
}: IConditionModalOptionsButtonProps): ReactElement => {
  return (
    <button ref={refEl} className="rounded-full p-0.5" {...rest}>
      <Icon
        name="Options"
        className="cursor-pointer text-blue-bright"
        stroke={false}
      />
    </button>
  )
}
