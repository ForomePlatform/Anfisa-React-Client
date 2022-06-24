import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptionsNames } from './filter-control.const'

export interface IFilterControlProps {
  SolutionControl: React.ElementType
  SolutionCreate: React.ElementType
  TextEditorButton?: React.ElementType
  isForwardAllowed: boolean
  isBackwardAllowed: boolean
  isSaveButtonShown: boolean
  pageName: FilterControlOptionsNames
  goForward: () => void
  goBackward: () => void
  className?: string
}
