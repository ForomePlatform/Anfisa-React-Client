import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import {
  FilterControlOptions,
  FilterControlOptionsNames,
} from '../filter-control.const'
import { SolutionSelectButton } from './solution-select-button'
import { SolutionSelectPopover } from './solution-select-popover'

interface ISolutionDropDownProps {
  pageName: FilterControlOptionsNames
  goToPage: (page: FilterControlOptions) => void
}

export const SolutionSelect = ({
  pageName,
  goToPage,
}: ISolutionDropDownProps): ReactElement => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  return (
    <>
      <SolutionSelectButton
        pageName={pageName}
        isOpen={isPopoverOpen}
        onClick={onToggle}
      />

      <SolutionSelectPopover
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        goToPage={goToPage}
        onClose={closePopover}
      />
    </>
  )
}
