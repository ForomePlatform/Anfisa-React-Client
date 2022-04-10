import { IDsStat, TDsStat } from './filtering-regime.interface'

export const adaptDsStatResponse = (response: IDsStat): TDsStat => {
  return {
    list: response['stat-list'],
    filteredCounts: response['filtered-counts'],
    totalCounts: response['total-counts'],
  }
}
