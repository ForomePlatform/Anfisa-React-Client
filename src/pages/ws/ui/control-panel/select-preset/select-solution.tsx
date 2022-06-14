import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterPresetsStore from '@store/filter-presets'
import { SolutionControlButton } from '@components/solution-control/solution-control-button'
import { SelectSolutionPopover } from './select-solution-popover'

export const SelectSolution = observer(() => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

  const { activePreset, availablePresets, isFetchingPresets } =
    filterPresetsStore

  const [selectedPreset, setSelectedPreset] = useState(activePreset)

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  const handleApplyPreset = (presetName: string) => {
    setSelectedPreset(presetName)
    filterPresetsStore.setActivePreset(presetName)
    closePopover()
  }

  return (
    <>
      <SolutionControlButton
        solutionName={selectedPreset}
        controlName={t('solutionControl.filterPreset')}
        isFetchingSolutions={isFetchingPresets}
        isOpen={isPopoverOpen}
        onClick={event =>
          isPopoverOpen ? closePopover() : setPopoverAnchor(event.currentTarget)
        }
        onMouseUp={event => event.stopPropagation()}
      />

      <SelectSolutionPopover
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
