import { ReactElement } from 'react'

import {
  INumericPropertyStatus,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'
import { ICommonControlProps } from '../conditions.interface'

export interface INumericConditionControlsProps
  extends Omit<ICommonControlProps, 'mode'> {
  value: TNumericConditionBounds
}

export interface INumericConditionProps {
  attrData: INumericPropertyStatus
  isDataReady: boolean
  initialValue?: TNumericConditionBounds
  className?: string
  controls?: (props: INumericConditionControlsProps) => ReactElement | null
}
