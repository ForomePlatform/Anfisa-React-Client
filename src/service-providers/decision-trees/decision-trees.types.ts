import { TItemsCount, TPropertyStatus } from '../common'

export type TDtreeStat = {
  list: TPropertyStatus[]
  filteredCounts: TItemsCount
  totalCounts: TItemsCount
}
