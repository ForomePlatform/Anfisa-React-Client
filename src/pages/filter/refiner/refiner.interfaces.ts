import { TUnitGroups } from '@store/stat-units'
import { IFuncPropertyStatus } from '@service-providers/common'

export interface IUnitsProps {
  groups: TUnitGroups
  functionalUnits: IFuncPropertyStatus[]
  isFetching: boolean
}

export interface IFilterRefinerProps extends IUnitsProps {
  className?: string
}
