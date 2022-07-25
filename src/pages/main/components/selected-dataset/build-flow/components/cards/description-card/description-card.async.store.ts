import { BaseAsyncDataStore } from '@store/common'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { IDsInfo } from '@service-providers/dataset-level/dataset-level.interface'

export interface IDsInfoQuery {
  datasetName: string
  datasetDescription: string
}

export class descriptionCardAsyncStore extends BaseAsyncDataStore<
  IDsInfo,
  IDsInfoQuery
> {
  constructor() {
    super()
  }

  protected fetch(query: IDsInfoQuery): Promise<IDsInfo> {
    return datasetProvider.updateDsInfo({
      ds: query.datasetName,
      note: query.datasetDescription,
    })
  }
}
