import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import { IGeneRegionArgs } from '@service-providers/common'

export interface IControlProps {
  hasErrors: boolean
  param: IGeneRegionArgs
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

export interface IGeneRegionInputProps {
  value: string
  handleChange: (e: string) => void
  classname?: Argument
}
