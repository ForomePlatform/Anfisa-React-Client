import { Layout } from 'react-grid-layout'

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

export interface IChangeHeightProps {
  index: number
  id: string
  isOpen: boolean
}

export interface IGetLayoutOnHeightChange extends IChangeHeightProps {
  mainTabsLayout: Layout[]
}

export interface IWidgetTabProps {
  group: IExtendedTUnitGroups
  index: number
  id: string
  onChangeTabPlace: (props: IChangeGroupPlaceProps) => void
  onChangeTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
}

// TODO: fix any type
export interface IWidgetSubTabProps {
  unit: any
  id: string
  tabIndex: number
  isAllTabsOpened: boolean
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
}
