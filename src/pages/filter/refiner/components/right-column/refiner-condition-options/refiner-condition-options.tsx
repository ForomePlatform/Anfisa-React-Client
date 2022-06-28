import { ReactElement } from 'react'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'
import { RefinerConditionOptionsButton } from './refiner-condition-options-button'
import { RefinerConditionPopover } from './refiner-condition-options-popover'

export const RefinerConditionOptions = (): ReactElement => {
  const { selectedConditionIndex, conditions } = filterStore
  const filterName = conditions[selectedConditionIndex]?.[1] ?? ''
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleCopyFilterName = (e: React.MouseEvent) => {
    e.stopPropagation()

    copyToClipboard(filterName)

    showToast(t('ds.copied'), 'info')
  }

  const handleDeleteFilterBlock = (e: React.MouseEvent) => {
    e.stopPropagation()
    filterStore.removeCondition(selectedConditionIndex)
  }

  return (
    <>
      <RefinerConditionOptionsButton
        isOpen={isPopoverOpen}
        onShowPopover={onToggle}
      />

      <RefinerConditionPopover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        onDeleteFilterBlock={handleDeleteFilterBlock}
        onCopyFilterName={handleCopyFilterName}
      />
    </>
  )
}
