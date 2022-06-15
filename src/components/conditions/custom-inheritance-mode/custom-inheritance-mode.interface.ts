import { ReactElement } from 'react'

import { IScenario } from '@service-providers/common'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import {
  ICommonControlProps,
  ICommonFuncConditionProps,
} from '../conditions.interface'

export interface IControlProps extends ICommonControlProps {
  param: ICustomInheritanceModeArgs
}

export interface ICustomInheritanceModeConditionProps
  extends ICommonFuncConditionProps {
  problemGroups: string[]
  initialScenario: IScenario
  controls?: (props: IControlProps) => ReactElement | null
}
export interface IHandleSetComplexScenarioProps {
  preparedScenarioName: string
  problemGroups: string[]
  setScenario: (scenario: IScenario) => void
}

export interface ICustomInheritanceModeScenarioProps {
  problemGroups: string[]
  selectValues: string[]
  onChangeScenario: (index: number, value: string) => void
}
