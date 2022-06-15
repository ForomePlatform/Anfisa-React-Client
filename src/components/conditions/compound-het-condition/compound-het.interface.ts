import { ReactElement } from 'react'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ICompoundHetArgs } from '@service-providers/common/common.interface'
import {
  ICommonControlProps,
  ICommonFuncConditionProps,
} from './../conditions.interface'

export interface IControlProps extends ICommonControlProps {
  param: ICompoundHetArgs
}

export interface ICompoundHetConditionProps extends ICommonFuncConditionProps {
  initialApprox: ApproxNameTypes
  controls?: (props: IControlProps) => ReactElement | null
}
