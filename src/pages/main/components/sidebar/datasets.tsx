import styles from './datasets.module.css'

import React, { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Sidebar } from '@ui/sidebar'
import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { ReloadButton } from '@pages/main/components/sidebar/reload-button'
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
      <div className={cn(styles.datasets__header)}>
        <div className={cn(styles.datasets__header__container)}>
          <div
            data-testid={FilterDatasetDataCy.leftPanelHeader}
            className={cn(styles.datasets__header__text)}
          >
            {t('home.datasets')}
          </div>

          <HandleDataset />
        </div>

        <ReloadButton />
      </div>

      <FilterSortDatasets />

      <DatasetsList />

      <DocLinks />
    </Sidebar>
  )
})
