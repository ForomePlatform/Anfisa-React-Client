import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { IGeneRegionArgs } from '@service-providers/common'
import {
  ICommonControlProps,
  ICommonFuncConditionProps,
} from '../conditions.interface'

export interface IControlProps extends ICommonControlProps {
  param: IGeneRegionArgs
}

export interface IGeneRegionProps extends ICommonFuncConditionProps {
  initialLocusValue: string | undefined
  controls?: (props: IControlProps) => ReactElement | null
}

export interface IGeneRegionInputProps {
  value: string
  onChange: (e: string) => void
  classname?: Argument
}
