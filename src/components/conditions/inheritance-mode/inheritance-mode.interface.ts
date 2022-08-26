import { ReactElement } from 'react'
import { Argument } from 'classnames'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { IInheritanceModeArgs, TVariant } from '@service-providers/common'
import {
  ICommonControlProps,
  ICommonFuncConditionProps,
} from '../conditions.interface'

export interface IControlProps extends ICommonControlProps {
  param: IInheritanceModeArgs
  values: string[]
}

export interface IInheritanceModeConditionProps
  extends ICommonFuncConditionProps {
  problemGroups: string[]
  initialVariants: string[] | undefined
  initialProblemGroups: string[] | undefined
  controls?: (props: IControlProps) => ReactElement | null
}

export interface IInheritanceModeProblemGroupsProps {
  problemGroups: string[]
  selectedPropblemGroups: string[]
  className?: Argument
  handleReset: () => void
  handleSetProblemGroups: (checked: boolean, problemGroup: string) => void
}

export interface IInheritanceModeVariantsControlsProps {
  selectedVariants: string[]
  attributeSubKind: string | undefined
  mode: ModeTypes | undefined
  className?: Argument
  onSelectAllVariants: () => void
  onClearAllVariants: () => void
  toggleMode: (mode: ModeTypes) => void
}

export interface IInheritanceModeVariantsProps {
  filteredVariants: TVariant[]
  selectedVariants: string[]
  isFetching: boolean
  status: string | undefined
  className?: Argument
  handleSetVariants: (checked: boolean, variantName: string) => void
}
