import { ReactElement } from 'react'

import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { ControlPanelDivider } from './control-panel-divider'
import { EditFilter } from './control-panel-edit-filter'
import { ControlPanelPreset } from './control-panel-preset'
import { CustomizeTable } from './customize-table-modal/customize-table'
import { DatasetCreationButton } from './dataset-creation-button'
import { GenesListModal } from './zone-modals/genes-list-modal'
import { GenesModal } from './zone-modals/genes-modal'
import { SamplesModal } from './zone-modals/samples-modal'
import { TagsModal } from './zone-modals/tags-modal'
import { ZoneItem } from './zone-modals/zone-item'

export const ControlPanel = (): ReactElement => (
  <div className="w-auto flex px-4 bg-blue-dark">
    <div className="rounded flex pt-2 pb-4">
      <ControlPanelPreset />

      <ControlPanelDivider />

      <EditFilter />

      <ControlPanelDivider />

      <CustomizeTable />

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

        <ZoneItem
          title={t('ds.sample')}
          modalElement={SamplesModal}
          data={zoneStore.selectedSamples}
        />

        <ZoneItem
          title={t('ds.tags')}
          modalElement={TagsModal}
          data={zoneStore.selectedTags}
        />
      </div>

      <DatasetCreationButton />
    </div>
  </div>
)
