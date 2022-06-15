import { ReactElement } from 'react'

import { Divider } from '@ui/divider'
import { CreateDataset } from './create-dataset'
import { CustomizeTable } from './customize-table/customize-table'
import { EditFilter } from './edit-filter'
import { SelectSolution } from './select-preset/select-solution'
import { GenesListZone } from './zones/genes-list-zone'
import { GenesZone } from './zones/genes-zone'
import { SamplesZone } from './zones/samples-zone'
import { TagsZone } from './zones/tags-zone'

export const ControlPanel = (): ReactElement => (
  <div className="w-full flex px-4 bg-blue-dark">
    <div className="w-full flex justify-between pt-2 pb-4">
      <div className="flex items-center">
        <SelectSolution />

        <Divider orientation="vertical" className="h-[75%]" />

        <EditFilter />

        <Divider orientation="vertical" className="h-[75%]" />

        <CustomizeTable />

        <Divider orientation="vertical" className="h-[75%]" />

        <div className="flex bg-blue-darkHover rounded-sm px-3 min-h-32">
          <GenesZone />

          <GenesListZone />

          <SamplesZone />

          <TagsZone />
        </div>

        <Divider orientation="vertical" className="h-[75%]" />

        <CreateDataset />
      </div>
    </div>
  </div>
)
