import { Layout } from 'react-grid-layout'
import { Argument } from 'classnames'

import { TUnit, TUnitGroups } from '@store/stat-units'
import { IUnitsProps } from '@pages/filter/refiner/refiner.interfaces'
import {
  IEnumPropertyStatus,
  IFuncPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'

export interface IDashboardProps extends IUnitsProps {}

export interface IDashboardBodyProps {
  groups: IExtendedTUnitGroups[]
  filteredGroups: TUnitGroups
  className?: Argument
}

export interface IExtendedTUnitGroups {
  name: string
  units: TUnit[] | IFuncPropertyStatus[]
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
  filteredGroups: TUnitGroups
  index: number
  id: string
  isGroupInSearch: boolean
  isFunc: boolean
  onChangeTabPlace: (props: IChangeGroupPlaceProps) => void
  onChangeTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
}

export interface IWidgetSubTabProps {
  unit: TUnit | IFuncPropertyStatus
  id: string
  tabIndex: number
  disabled: boolean
  isAllTabsOpened: boolean
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
}

export interface IWidgetSubTabNumericProps {
  unit: INumericPropertyStatus
}

export interface IWidgetSubTabEnumProps {
  unit: IEnumPropertyStatus
}

export interface IWidgetTabHeaderProps {
  group: IExtendedTUnitGroups
  isAllTabsOpened?: boolean
  onToggle: () => void
}

export interface IFooterPanelProps {
  spareTabs: IExtendedTUnitGroups[]
  filteredGroups: TUnitGroups
  onChange: (props: IChangeGroupPlaceProps) => void
}

export interface IColsHeight {
  h: number
  x: number
}
