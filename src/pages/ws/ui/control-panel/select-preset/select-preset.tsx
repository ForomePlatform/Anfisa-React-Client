import { useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import filterPresetsStore from '@store/filter-presets'
import { SolutionControlButton } from '@components/solution-control/solution-control-button'
import { SelectPresetPopover } from './select-preset-popover'

export const SelectPreset = observer(() => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const { activePreset, availablePresets, isFetchingPresets } =
    filterPresetsStore

  const [selectedPreset, setSelectedPreset] = useState(activePreset)

  const handleApplyPreset = (presetName: string) => {
    setSelectedPreset(presetName)
    filterPresetsStore.setActivePreset(presetName)
    closePopover()
  }

  useEffect(() => {
    reaction(
      () => filterPresetsStore.activePreset,
      activePreset => {
        activePreset ? setSelectedPreset(activePreset) : setSelectedPreset('')
      },
    )
  })

  return (
    <>
      <SolutionControlButton
        solutionName={selectedPreset}
        controlName={t('solutionControl.filterPreset')}
        isFetchingSolutions={isFetchingPresets}
        isOpen={isPopoverOpen}
        onClick={e => onToggle(e.currentTarget)}
        onMouseUp={event => event.stopPropagation()}
      />

      <SelectPresetPopover
        isOpen={isPopoverOpen}
        onClose={closePopover}
        anchorEl={popoverAnchor}
        solutions={availablePresets}
        selectedPreset={selectedPreset}
        onApply={handleApplyPreset}
      />
    </>
  )
})
