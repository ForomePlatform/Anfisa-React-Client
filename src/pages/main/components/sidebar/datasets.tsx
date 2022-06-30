import React, { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Sidebar } from '@ui/sidebar'
import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { HandleDataset } from '../handle-dataset'
import { DatasetsList } from './datasets-list/datasets-list'
import { DocLinks } from './doc-links'
import { FilterSortDatasets } from './filter-sort-datasets'
import { sidebarUiStore } from './sidebar-ui.store'

export const Datasets = observer((): ReactElement => {
  const { width, isCollapsed, setWidth, setCollapsed } = sidebarUiStore

  return (
    <Sidebar
      className="h-full z-10 flex-shrink-0"
      wrapperClassName="bg-blue-lighter"
      contentClassName="flex flex-col pt-[18px] overflow-auto"
      width={width}
      minWidth={240}
      maxWidth={600}
      onChangeWidth={setWidth}
      canCollapse
      isCollapsed={isCollapsed}
      onToggle={setCollapsed}
    >
      <div className="flex justify-between mb-3 px-4">
        <div className="flex items-center">
          <div
            data-testid={FilterDatasetDataCy.leftPanelHeader}
            className="font-bold text-white text-20 leading-6"
          >
            {t('home.datasets')}
          </div>
          <HandleDataset />
        </div>
      </div>
      <FilterSortDatasets />

      <DatasetsList />

      <DocLinks />
    </Sidebar>
  )
})
