import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import {
  ICustomInheritanceModeArgs,
  IScenario,
} from '@service-providers/common'

export interface IControlProps {
  hasErrors: boolean
  param: ICustomInheritanceModeArgs
  mode: ModeTypes | undefined
  clearValue?: () => void
}

export interface ICustomInheritanceModeConditionProps {
  problemGroups: string[]
  initialScenario: IScenario
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  onTouch?: () => void
  controls?: (props: IControlProps) => ReactElement | null
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
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
