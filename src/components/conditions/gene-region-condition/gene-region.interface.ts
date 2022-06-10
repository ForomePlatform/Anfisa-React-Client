import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'

export interface IControlProps {
  hasErrors: boolean
  param: any
  mode: ModeTypes | undefined
  clearValue?: () => void
}

export interface IGeneRegionProps {
  initialLocusValue: string | undefined
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  onTouch?: () => void
  controls?: (props: IControlProps) => ReactElement | null
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
}
