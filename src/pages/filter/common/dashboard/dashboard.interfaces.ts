import { TUnit } from '@store/stat-units'
import { IUnitsProps } from '@pages/filter/refiner/refiner.interfaces'
import { IFuncPropertyStatus } from '@service-providers/common'

export interface IDashboardProps extends IUnitsProps {}

// TODO: remove any

export interface IExtendedTUnitGroups {
  name: string
  units: any[]
  power?: number
}

export interface IChangeGroupPlaceProps {
  groupType: string
  groupName: string
  groupIndex: number
}
