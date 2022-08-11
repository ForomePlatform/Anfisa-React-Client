import axios from 'axios'

import { getApiUrl } from '@core/get-api-url'
import { ServiceProviderBase } from '@service-providers/common'
import {
  ICsvExportArguments,
  IDs2Ws,
  IDs2WsArguments,
  IExportOpearation,
  IExportOpearationArguments,
  IExportWs,
  IExportWsArguments,
  IImportWs,
  IImportWsArguments,
} from './operations.interface'

class OperationsProvider extends ServiceProviderBase {
  private _jobStatusResolve: ((value: unknown) => void) | undefined
  private _jobStatusReject: ((value: unknown) => void) | undefined

  constructor() {
    super()
  }

  exportCsv(params: ICsvExportArguments) {
    return this.post<Blob>('csv_export', params, { responseType: 'blob' }).then(
      res => res.data,
    )
  }

  export(params: IExportOpearationArguments) {
    return this.post<IExportOpearation>('export', params).then(res => res.data)
  }

  createWorkspace(params: IDs2WsArguments) {
    return this.post<IDs2Ws>('ds2ws', params).then(res => res.data)
  }

  exportDataset(params: IExportWsArguments) {
    return this.post<IExportWs>('export_ws', params).then(res => res.data)
  }

  importDataset({ file, name }: IImportWsArguments) {
    const bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('file', file)

    return axios
      .post<IImportWs>(getApiUrl('import_ws'), bodyFormData, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }

  public getJobStatusAsync<T>(taskId: string, interval = 1000) {
    return new Promise((resolve, reject) => {
      if (!this._jobStatusResolve) {
        this._jobStatusResolve = resolve
      }
      if (!this._jobStatusReject) {
        this._jobStatusReject = reject
      }
      this.get<[boolean | null | T, string]>('job_status', {
        params: { task: taskId },
      }).then(({ data }) => {
        if (data[0] === null) {
          this._jobStatusReject?.(data[1])
          this._jobStatusReject = undefined
          this._jobStatusResolve = undefined
        } else if (!data[0]) {
          setTimeout(() => this.getJobStatusAsync<T>(taskId), interval)
        } else {
          this._jobStatusResolve?.(data)
          this._jobStatusReject = undefined
          this._jobStatusResolve = undefined
        }
      })
    })
  }
}

export default new OperationsProvider()
