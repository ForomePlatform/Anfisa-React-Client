import { useState } from 'react'

export const usePopover = () => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  const onToggle = (target: HTMLElement) => {
    isPopoverOpen ? closePopover() : setPopoverAnchor(target)
  }

  return {
    popoverAnchor,
    isPopoverOpen,
    onToggle,
    closePopover,
  }
}
