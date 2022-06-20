import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import { TCustomizableListItem } from '@components/customizable-list'

export type TCustomizeTableValues = {
  columns: TCustomizableListItem[]
  viewType: ViewTypeTableEnum
}
