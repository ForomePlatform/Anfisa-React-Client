import { ServiceProviderBase } from '../common/service-provider-base'
import {
  IDsInfo,
  IDsInfoArguments,
  IDsList,
  IDsListArguments,
  IReccntArguments,
  TRecCntResponse,
} from './dataset-level.interface'

class DatasetProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public getDsInfo(params: IDsInfoArguments): Promise<IDsInfo> {
    return this.axios
      .get<IDsInfo>('/dsinfo', {
        params,
      })
      .then(res => res.data)
  }

  public getDsList(params: IDsListArguments): Promise<IDsList> {
    return this.axios
      .post<IDsList>('/ds_list', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => res.data)
  }

  public getRecCnt(params: IReccntArguments): Promise<TRecCntResponse[]> {
    return this.axios
      .post<TRecCntResponse[]>('/reccnt', params)
      .then(res => res.data)
  }
}

export default new DatasetProvider()
