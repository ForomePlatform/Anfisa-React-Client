import { ReactElement } from 'react'

import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { FilterItemGenes } from './control-panel-filter-genes'
import { FilterItemGenesList } from './control-panel-filter-genes-list'
import { FilterItemSamples } from './control-panel-filter-samples'
import { FilterItemTags } from './control-panel-filter-tags'
import { ControlPanelPreset } from './control-panel-preset'
import { Results } from './control-panel-settings'
import { DatasetCreationButton } from './dataset-creation-button'
import { GenesListModal } from './genes-list-modal'
import { GenesModal } from './genes-modal'
import { ZoneItem } from './zone-item'

export const ControlPanel = (): ReactElement => (
  <div className="w-auto flex px-4 bg-blue-dark">
    <div className="rounded flex px-4 pt-2 pb-4">
      <ControlPanelPreset />

      <ControlPanelDivider />

      <EditFilter />

      <ControlPanelDivider />

      <Results />

      <div className="flex ml-5 bg-blue-darkHover rounded-sm px-3">
        <ZoneItem
          title={t('ds.gene')}
          modalElement={GenesModal}
          data={zoneStore.selectedGenes}
        />

        <ZoneItem
          title={t('ds.geneList')}
          modalElement={GenesListModal}
          data={zoneStore.selectedGenesList}
        />

        {/* <FilterItemGenesList title={t('ds.geneList')} /> */}

        {/* <ControlPanelDivider className="bg-blue-secondary" />

        <FilterItemSamples title={t('ds.sample')} />

        <ControlPanelDivider className="bg-blue-secondary" />

        <FilterItemTags title={t('ds.tags')} /> */}
      </div>

      <DatasetCreationButton />
    </div>
  </div>
)
