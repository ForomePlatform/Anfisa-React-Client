import { AxiosRequestConfig } from 'axios'

import { adaptDataToCamelizedType } from '@service-providers/common'
import { ServiceProviderBase } from './../common'
import {
  IMacroTagging,
  IMacroTaggingArguments,
  ITagSelect,
  ITagSelectArguments,
  IWsList,
  IWsListArguments,
  IWsTags,
  IWsTagsArguments,
  IZoneDescriptor,
  IZoneListArguments,
  IZoneVariantsArguments,
  IZoneWithVariants,
} from './ws-dataset-support.interface'

class WsDatasetSupportProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getWsList(
    params: IWsListArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IWsList> {
    return this.post<IWsList>('/ws_list', params, options).then(res =>
      adaptDataToCamelizedType<IWsList>(res.data),
    )
  }

  public getZoneList(
    params: IZoneListArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IZoneDescriptor[]> {
    return this.post('/zone_list', params, options).then(res => res.data)
  }

  public getZoneVariants(
    params: IZoneVariantsArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IZoneWithVariants> {
    return this.post('/zone_list', params, options).then(res => res.data)
  }

  public wsTags(
    params: IWsTagsArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IWsTags> {
    return this.post<IWsTags>('/ws_tags', params, options).then(res =>
      adaptDataToCamelizedType(res.data),
    )
  }

  public getTagSelect(
    params: ITagSelectArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<ITagSelect> {
    return this.get('/tag_select', { ...options, params }).then(res =>
      adaptDataToCamelizedType(res.data),
    )
  }

  public updateMicroTagging(
    params: IMacroTaggingArguments,
  ): Promise<IMacroTagging> {
    return this.post<IMacroTagging>('/macro_tagging', params).then(
      res => res.data,
    )
  }
}

export default new WsDatasetSupportProvider()
