import styles from './control-panel.module.css'

import { ReactElement } from 'react'

import { t } from '@i18n'
import zoneStore from '@store/ws/zone'
import { Divider } from '@ui/divider'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { EditFilter } from './control-panel-edit-filter'
import { ControlPanelPreset } from './control-panel-preset'
import { CreateDatasetButton } from './create-dataset-button'
import { CustomizeTable } from './customize-table/customize-table'
import { GenesListModal } from './zone-modals/genes-list-modal'
import { GenesModal } from './zone-modals/genes-modal'
import { SamplesModal } from './zone-modals/samples-modal'
import { TagsModal } from './zone-modals/tags-modal'
import { ZoneItem } from './zone-modals/zone-item'

export const ControlPanel = (): ReactElement => (
  <div className={styles.controlPanel}>
    <div className={styles.controlPanel__controls}>
      <ControlPanelPreset />

      <Divider orientation="vertical" />

      <EditFilter />

      <Divider orientation="vertical" />

      <CustomizeTable />

      <Divider orientation="vertical" />

      <div className={styles.controlPanel__zones}>
        <ZoneItem
          title={t('ds.gene')}
          modalElement={GenesModal}
          selectedTagsList={zoneStore.selectedGenes}
          removeZoneTag={zoneStore.removeGene}
          dataTestId={MainTableDataCy.addGene}
        />

        <ZoneItem
          title={t('ds.geneList')}
          modalElement={GenesListModal}
          selectedTagsList={zoneStore.selectedGenesList}
          removeZoneTag={zoneStore.removeGenesList}
        />

        <ZoneItem
          title={t('ds.sample')}
          modalElement={SamplesModal}
          selectedTagsList={zoneStore.selectedSamples}
          removeZoneTag={zoneStore.removeSample}
          dataTestId={MainTableDataCy.addSample}
        />

        <ZoneItem
          title={t('ds.tags')}
          modalElement={TagsModal}
          selectedTagsList={zoneStore.selectedTags}
          removeZoneTag={zoneStore.removeLocalTag}
          dataTestId={MainTableDataCy.addTag}
          isLast
        />
      </div>

      <Divider orientation="vertical" />
    </div>
    <div className={styles.controlPanel__save}>
      <CreateDatasetButton />
    </div>

    {/* TODO: need a functional <UndoRedoButtons /> */}
  </div>
)
