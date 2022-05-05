import React, { ReactElement, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import {
  BaseAsyncDataStore,
  BaseAsyncPaginatedDataStore,
  // TBaseDataStoreFetchOptions,
} from '@store/common'
import { Button } from '@ui/button'
import DatasetProvider from '@service-providers/dataset-level/dataset.provider'
import {
  ITabReport,
  ITabReportArguments,
} from '@service-providers/dataset-level/dataset-level.interface'
import {
  IWsList,
  IWsListArguments,
} from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import WsDatasetSupportProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'

const PAGE_SIZE = 40

class WsListDataStore extends BaseAsyncDataStore<IWsList, IWsListArguments> {
  constructor() {
    super()
  }

  protected fetch(
    query: IWsListArguments,
    // options: TBaseDataStoreFetchOptions,
  ): Promise<IWsList> {
    return WsDatasetSupportProvider.getWsList(query)
  }
}

type TTabReport = ITabReport[]

type TTabReportDataStoreQuery = Pick<ITabReportArguments, 'ds' | 'seq'>

class TabReportDataStore extends BaseAsyncDataStore<
  TTabReport,
  TTabReportDataStoreQuery
> {
  constructor() {
    super()
  }

  protected fetch(
    query: TTabReportDataStoreQuery,
    // options: TBaseDataStoreFetchOptions,
  ): Promise<ITabReport[]> {
    return DatasetProvider.getTabReport({ ...query, schema: 'xbr' })
  }
}

class TabReportPaginatedDataStore extends BaseAsyncPaginatedDataStore<TabReportDataStore> {
  private readonly wsListStore: WsListDataStore

  constructor(wsListStore: WsListDataStore) {
    super(TabReportDataStore)

    this.wsListStore = wsListStore

    reaction(
      () => wsListStore.data,
      () => {
        this.reset()
      },
    )
  }

  protected getPageQuery(
    pageNum: number,
  ): TTabReportDataStoreQuery | undefined {
    const ds = this.wsListStore.query?.ds
    const seq = this.wsListStore.data?.records
      .slice(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE)
      .map(record => record.no)

    if (!ds || !seq || !seq.length) {
      return undefined
    }

    return {
      ds,
      seq,
    }
  }
}

const wsList = new WsListDataStore()
const tabReport = new TabReportPaginatedDataStore(wsList)

export const DemoPage = observer((): ReactElement => {
  useEffect(() => {
    wsList.setQuery({ ds: 'PGP3140_wgs_panel_hl' })
  }, [])

  return (
    <div className="p-6">
      <Button
        text="Change dataset"
        onClick={() => wsList.setQuery({ ds: 'Zuriko' })}
      />
      {tabReport.pages.map(page =>
        page.data?.map(row => (
          <div
            key={row._no}
            className="border border-blue-light p-1 m-1 text-xs overflow-hidden"
          >
            {JSON.stringify(row)}
          </div>
        )),
      )}
      {tabReport.lastPage?.isFetching ? (
        <div className="text-xl">Loading...</div>
      ) : (
        tabReport.hasNextPage && (
          <Button text="Load more" onClick={() => tabReport.addPage()} />
        )
      )}
    </div>
  )
})
