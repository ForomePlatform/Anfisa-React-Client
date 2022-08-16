import { AxiosRequestConfig } from 'axios'

import {
  adaptDataToCamelizedType,
  ServiceProviderBase,
} from '@service-providers/common'
import { TRecCntResponse } from './../dataset-level'
import {
  IAdmDropDsArguments,
  IAdmReloadDsArguments,
  IDefaults,
  IDirInfo,
  IJobStatusArgument,
  ISingleCntArgument,
  TJobStatus,
} from './vault-level.interface'

class VaultProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public getDefaults() {
    return this.get<IDefaults>('defaults').then(res => res.data)
  }

  public getDirInfo() {
    return this.get<IDirInfo>('dirinfo').then(res =>
      adaptDataToCamelizedType<IDirInfo>(res.data, ['ds-dict']),
    )
  }

  public getSingleCnt(params: ISingleCntArgument) {
    return this.post<TRecCntResponse>('single_cnt', params).then(
      res => res.data,
    )
  }

  public getJobStatus<Result>(
    params: IJobStatusArgument,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<TJobStatus<Result>> {
    return this.post('job_status', params, options).then(res => res.data)
  }

  public updateAdm() {
    return this.post<string>('adm_update').then(res => res.data)
  }

  public reloadDs(params: IAdmReloadDsArguments) {
    return this.post<string>('adm_reload_ds', params).then(res => res.data)
  }

  public dropDs(params: IAdmDropDsArguments) {
    return this.post<string>('adm_drop_ds', params).then(res => res.data)
  }
}

export default new VaultProvider()
