import { getApiUrl } from '@core/get-api-url'
import { TItemsCount, TPropertyStatus } from '../common/common.interface'
import { IStatunits } from '../filtering-regime/filtering-regime.interface'
import { IDtreeStatResponse } from './decision-trees.interface'

type TFetchDtreeStatParams = {
  ds: string
  no: string
  code: string
}

export type TDtreeStat = {
  list: TPropertyStatus[]
  filteredCounts: TItemsCount
  totalCounts: TItemsCount
}

type TFetchDtreeStatOptions = {
  abortSignal?: AbortSignal
  onPartialResponse?: (response: TDtreeStat) => void
}

const getIncompleteProps = (list: TPropertyStatus[]): string[] =>
  list.filter(stat => stat.incomplete).map(stat => stat.name)

export const fetchDtreeStat = async (
  params: TFetchDtreeStatParams,
  options: TFetchDtreeStatOptions = {},
): Promise<TDtreeStat> => {
  const { abortSignal, onPartialResponse } = options

  const response = await fetch(getApiUrl('dtree_stat'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      ...params,
      tm: '0',
    }),
    signal: abortSignal,
  })

  const data: IDtreeStatResponse = await response.json()

  const requestId = data['rq-id']
  let resp: TDtreeStat = {
    list: data['stat-list'],
    filteredCounts: data['filtered-counts'],
    totalCounts: data['total-counts'],
  }
  let incompleteProps = getIncompleteProps(resp.list)

  while (incompleteProps.length > 0) {
    if (abortSignal && abortSignal.aborted) {
      throw new DOMException('fetchDtreeStat aborted', 'AbortError')
    }

    if (onPartialResponse) {
      onPartialResponse(resp)
    }

    const unitsResponse = await fetch(getApiUrl('statunits'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        rq_id: requestId,
        ds: params.ds,
        no: params.no,
        tm: '1',
        units: JSON.stringify(incompleteProps),
      }),
      signal: abortSignal,
    })

    const unitsData: IStatunits = await unitsResponse.json()
    const unitsStatList = unitsData['units']

    resp = {
      ...resp,
      list: resp.list.map(prop => {
        const { name } = prop

        return unitsStatList.find(item => item.name === name) ?? prop
      }),
    }

    incompleteProps = getIncompleteProps(resp.list)
  }

  return resp
}
