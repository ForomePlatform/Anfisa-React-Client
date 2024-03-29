import styles from './control-panel.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Divider } from '@ui/divider'
import { MacroTagging } from '@pages/ws/ui/control-panel/macro-tagging/macro-tagging'
import { CreateDataset } from './create-dataset'
import { CustomizeTable } from './customize-table'
import { EditFilter } from './edit-filter'
import { SelectPreset } from './select-preset'
import { GenesListZone } from './zones/genes-list-zone'
import { GenesZone } from './zones/genes-zone'
import { SamplesZone } from './zones/samples-zone'
import { TagsZone } from './zones/tags-zone'

export const ControlPanel = observer((): ReactElement => {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlPanel__controls}>
        <SelectPreset />

        <Divider orientation="vertical" />

        <EditFilter />

        <Divider orientation="vertical" />

        <CustomizeTable />

        <Divider orientation="vertical" />

        <div className={styles.controlPanel__zones}>
          <GenesZone />

          <GenesListZone />

          <SamplesZone />

          <TagsZone />
        </div>

        <Divider orientation="vertical" />

        <MacroTagging />
      </div>

      <div className={styles.controlPanel__save}>
        <CreateDataset
          disabled={
            filterStore.conditions.length === 0 &&
            dtreeStore.stepIndexes.length === 0
          }
        />
      </div>
    </div>
  )
})
