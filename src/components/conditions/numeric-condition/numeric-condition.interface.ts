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
  className?: string
  attrData: INumericPropertyStatus
  initialValue?: TNumericConditionBounds
  controls?: (props: INumericConditionControlsProps) => ReactElement | null
}
