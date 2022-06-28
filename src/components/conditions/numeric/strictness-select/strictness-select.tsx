import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import { StrictnessSelectButton } from './strictness-select-button'
import { StrictnessSelectPopover } from './strictness-select-popover'

export interface IStrictnessSelectProps {
  value: boolean
  onChange: (newValue: boolean) => void
  isDisabled?: boolean
}

export const StrictnessSelect = ({
  value,
  onChange,
  isDisabled,
}: IStrictnessSelectProps): ReactElement => {
  const { isPopoverOpen, popoverAnchor, onToggle, closePopover } = usePopover()

  return (
    <>
      <StrictnessSelectButton
        isOpen={isPopoverOpen}
        onShowPopover={onToggle}
        value={value}
        disabled={isDisabled}
      />

      <StrictnessSelectPopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onSelect={value => {
          onChange(value)
          closePopover()
        }}
      />
    </>
  )
}
