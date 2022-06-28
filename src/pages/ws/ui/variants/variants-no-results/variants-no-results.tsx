import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import zoneStore from '@store/ws/zone.store'
import { NoResultsFound } from '@components/no-results-found'

export const VariantsNoResults = observer(() => {
  const filterConditions = filterStore.conditions

  const { selectedGenes, selectedGenesList, selectedSamples, selectedTags } =
    zoneStore

  const resetTableToInitial = () => {
    filterStore.reset()
    filterPresetsStore.resetActivePreset()
    zoneStore.resetAllSelectedItems()
    zoneStore.clearZone()
  }

  const isFiltersSelected =
    filterConditions.length > 0 ||
    selectedGenes.length > 0 ||
    selectedGenesList.length > 0 ||
    selectedSamples.length > 0 ||
    selectedTags.length > 0 ||
    zoneStore.isModeWithNotes

  return isFiltersSelected ? (
    <NoResultsFound
      text={t('general.noResultsFoundByFilters')}
      className="text-black font-bold"
      action={{
        text: t('general.resetFilters'),
        handler: resetTableToInitial,
      }}
    />
  ) : (
    <NoResultsFound text={t('general.noResultsFound')} />
  )
})

VariantsNoResults.displayName = 'VariantsNoResults'
