import { ReactElement } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

interface IConditionOptionsButtonProps extends IPopoverButtonBaseProps {
  className?: string
}

export const ConditionOptionsButton = ({
  className,
  onShowPopover,
}: IConditionOptionsButtonProps): ReactElement => (
  <Button
    className={className}
    variant="no-border"
    onClick={e => onShowPopover(e.currentTarget)}
    icon={
      <Icon
        name="Options"
        className="cursor-pointer text-blue-bright"
        stroke={false}
      />
    }
  />
)
