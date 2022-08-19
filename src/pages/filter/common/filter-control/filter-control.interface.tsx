import { ISolutionEntryDescription } from '@service-providers/common'
import { FilterControlOptionsNames } from './filter-control.const'

export interface IFilterControlProps {
  SolutionControl: React.ElementType
  TextEditorButton?: React.ElementType
  createSolutionEntry: (entryName: string) => void
  availableSolutionEntries: ISolutionEntryDescription[] | undefined
  isForwardAllowed: boolean
  isBackwardAllowed: boolean
  isEntryCreationAllowed: boolean
  disabledCreateDataset: boolean
  createDatasetTooltip?: string
  pageName: FilterControlOptionsNames
  goForward: () => void
  goBackward: () => void
  className?: string
}
