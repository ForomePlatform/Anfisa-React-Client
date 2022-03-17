import { IDtreeStatResponse } from './decision-trees.interface'
import { TDtreeStat } from './decision-trees.types'

export const adoptDtreeStatResponse = (
  response: IDtreeStatResponse,
): TDtreeStat => {
  return {
    list: response['stat-list'],
    filteredCounts: response['filtered-counts'],
    totalCounts: response['total-counts'],
  }
}
