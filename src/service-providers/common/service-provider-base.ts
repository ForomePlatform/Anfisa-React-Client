import axios, { AxiosRequestHeaders } from 'axios'

export class ServiceProviderBase {
  protected axios = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? '/app/'
        : `${process.env.REACT_APP_URL_BACKEND}/`,
    transformRequest: (data: unknown, headers?: AxiosRequestHeaders) => {
      if (
        headers?.['Content-Type'] === 'application/x-www-form-urlencoded' &&
        typeof data === 'object' &&
        !(data instanceof URLSearchParams)
      ) {
        return this.convertToURLParams(data)
      }

      return data
    },
  })

  protected convertToURLParams(data: any) {
    const result = new URLSearchParams()

    Object.keys(data).forEach(key => {
      const entry = data[key]

      if (typeof entry === 'object') {
        result.append(key, JSON.stringify(entry))
      } else {
        result.append(key, entry as string)
      }
    })

    return result
  }
}
