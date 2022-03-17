import { AxiosRequestConfig } from 'axios'

import { ServiceProviderBase } from '../common'
import { IStatunits, IStatunitsArguments } from './filtering-regime.interface'

export class FilteringRegimeProvider extends ServiceProviderBase {
  constructor() {
    super()
  }

  public async getStatUnits(
    params: IStatunitsArguments,
    options: Partial<AxiosRequestConfig> = {},
  ): Promise<IStatunits> {
    const response = await this.axios.post<IStatunits>('/statunits', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
    })

    return response.data
  }

  // TODO: ds_stat
  // TODO: statfunc
}

export default new FilteringRegimeProvider()
