import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import {
  ICompoundRequestArgs,
  TRequestCondition,
} from '@service-providers/common'

export interface IControlProps {
  hasErrors: boolean
  param: ICompoundRequestArgs
  mode: ModeTypes | undefined
  clearValue?: () => void
}

export interface ICompoundRequestProps {
  problemGroups: string[]
  initialMode: ModeTypes | undefined
  initialApprox: ApproxNameTypes
  initialRequestCondition: TRequestCondition[]
  attributeSubKind: string | undefined
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
  onTouch?: () => void
  controls?: (props: IControlProps) => ReactElement | null
}

export interface ICompoundRequestScenarioProps extends IRequestConditionsProps {
  className: Argument
  requestItem: TRequestCondition
  requestIndex: number
}

export interface IRequestConditionsProps {
  problemGroups: string[]
  requestCondition: TRequestCondition[]
  activeRequestIndex: number
  onChangeRequestConditionNumber: (
    requestBlockIndex: number,
    value: number,
  ) => void
  onChangeScenario: (
    requestBlockIndex: number,
    value: string,
    selectIndex: number,
  ) => void
  handleSetActiveRequestCondition: (requestBlockNumer: number) => void
}

export interface IGetSelectedValueProps {
  group: string
  requestIndex: number
  requestCondition: TRequestCondition[]
}

export interface IGetNewRequestConditionProps {
  clonedRequestCondition: TRequestCondition[]
  requestBlockIndex: number
  value: string
  problemGroups: string[]
  selectIndex: number
}
