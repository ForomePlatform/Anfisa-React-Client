import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'

export interface ICommonControlProps {
  hasErrors: boolean
  mode: ModeTypes | undefined
  clearValue: () => void
}

export interface ICommonFuncConditionProps {
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
  onTouch?: () => void
}
