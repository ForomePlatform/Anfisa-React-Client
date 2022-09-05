import { Argument } from 'classnames'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import { IScenario } from '@service-providers/common'

export interface ICommonControlProps {
  hasErrors: boolean
  mode: ModeTypes | undefined
  clearValue: () => void
}

export interface ICommonFuncConditionProps {
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
  className?: Argument
  onTouch?: () => void
}

export interface IGetPreparedScenarioProps {
  preparedScenarioName: string
  problemGroups: string[]
  affectedGroup: string[]
}

export interface IGetScenarioNameProps {
  scenario: IScenario
  affectedGroup: string[]
  groupsLength: number
}
