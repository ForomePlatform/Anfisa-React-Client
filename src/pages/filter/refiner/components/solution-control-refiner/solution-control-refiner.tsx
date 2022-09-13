import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { SolutionControl } from '@components/solution-control'
import {
  applyPreset,
  deletePreset,
  modifyPreset,
  resetPreset,
} from './solution-control-refiner.utils'

export const SolutionControlRefiner = observer((): ReactElement => {
  const { activePreset, availablePresets, isFetchingPresets } =
    filterPresetsStore

  return (
    <SolutionControl
      selected={activePreset}
      solutions={availablePresets}
      controlName={t('solutionControl.filterPreset')}
      isFetchingSolutions={isFetchingPresets}
      modifiedSolution={
        filterStore.isPresetModified
          ? filterPresetsStore.activePreset
          : undefined
      }
      onApply={applyPreset}
      onReset={resetPreset}
      isResetActive={!!filterPresetsStore.activePreset}
      onModify={modifyPreset}
      onDelete={deletePreset}
    />
  )
})
