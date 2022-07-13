import React, { ReactElement } from 'react'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { showToast } from '@utils/notifications/showToast'
import { ConditionOptionsButton } from './condition-options-button'
import { RefinerConditionPopover } from './condition-options-popover'

interface IConditionOptions {
  className?: string
  filterName: string
  onDelete: () => void
}

export const ConditionOptions = ({
  className,
  filterName,
  onDelete,
}: IConditionOptions): ReactElement => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleCopyFilterName = (e: React.MouseEvent) => {
    e.stopPropagation()

    copyToClipboard(filterName)
    showToast(t('ds.copied'), 'info')
  }

  return (
    <>
      <ConditionOptionsButton
        className={className}
        isOpen={isPopoverOpen}
        onShowPopover={onToggle}
      />

      <RefinerConditionPopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onDeleteFilterBlock={onDelete}
        onCopyFilterName={handleCopyFilterName}
      />
    </>
  )
}
