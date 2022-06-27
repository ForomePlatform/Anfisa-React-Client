import { ReactElement } from 'react'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

export const RefinerConditionOptionsButton = ({
  onShowPopover,
}: IPopoverButtonBaseProps): ReactElement => (
  <Button
    variant="text"
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
