import { ReactElement } from 'react'
import cn from 'classnames'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'
import { FilterControlOptionsNames } from '../filter-control.const'

interface ISolutionSelectProps extends IPopoverButtonBaseProps {
  pageName: FilterControlOptionsNames
}

export const SolutionSelectButton = ({
  pageName,
  isOpen,
  onClick,
}: ISolutionSelectProps): ReactElement => (
  <Button
    text={pageName}
    variant="secondary-dark"
    size="md"
    onClick={e => onClick(e.currentTarget)}
    append={
      <Icon
        size={14}
        name="Arrow"
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)
