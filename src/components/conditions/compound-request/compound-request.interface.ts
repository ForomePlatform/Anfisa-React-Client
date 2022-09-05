import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import {
  ICompoundRequestArgs,
  TRequestCondition,
} from '@service-providers/common'
import {
  ICommonControlProps,
  ICommonFuncConditionProps,
} from '../conditions.interface'

export interface IControlProps extends ICommonControlProps {
  param: ICompoundRequestArgs
}

export interface ICompoundRequestProps extends ICommonFuncConditionProps {
  affectedGroup: string[]
  problemGroups: string[]
  initialApprox: ApproxNameTypes
  initialRequestCondition: TRequestCondition[]
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
  isRedactorMode: boolean
  spacing?: Argument
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
