import { Layout } from 'react-grid-layout'
import { Argument } from 'classnames'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { TStatusWithPredictionPower } from '@store/stat-units'
import { IUnitsProps } from '@pages/filter/refiner/refiner.interfaces'
import {
  IEnumPropertyStatus,
  IFuncPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'
import { GlbPagesNames } from './../../../../glb/glb-names'

export interface IDashboardProps extends IUnitsProps {
  page: GlbPagesNames
}

interface IExtendedINumericPropertyStatus
  extends TStatusWithPredictionPower<INumericPropertyStatus> {
  isOpen: boolean
}

interface IExtendedIEnumPropertyStatus
  extends TStatusWithPredictionPower<IEnumPropertyStatus> {
  isOpen: boolean
}

interface IExtendedIFuncPropertyStatus extends IFuncPropertyStatus {
  isOpen: boolean
}

type TExtendedUnit =
  | IExtendedINumericPropertyStatus
  | IExtendedIEnumPropertyStatus
  | IExtendedIFuncPropertyStatus

export interface IDashboardBodyProps {
  groups: IExtendedTUnitGroups[]
  filteredGroups: IExtendedTUnitGroups[]
  className?: Argument
}

export interface IExtendedTUnitGroups {
  name: string
  units: TExtendedUnit[]
  isOpen: boolean
  isFavorite: boolean
  power?: number
  attributes?: TExtendedUnit[]
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
  filteredGroups: IExtendedTUnitGroups[]
  index: number
  id: string
  isGroupInSearch: boolean
  onChangeTabPlace: (props: IChangeGroupPlaceProps) => void
  onChangeTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
  onMakeTabFavorite: (
    groupType: DashboardGroupTypes,
    groupName: string,
    groupIndex: number,
  ) => void
}

export interface IWidgetSubTabProps {
  unit: TExtendedUnit
  id: string
  tabIndex: number
  disabled: boolean
  isAllTabsOpened: boolean
  isUnitOpened: boolean
  onChangeSubTabHeight: ({ index, id, isOpen }: IChangeHeightProps) => void
}

export interface IWidgetSubTabNumericProps {
  unit: INumericPropertyStatus
  onSelectUnit: (unit: INumericPropertyStatus) => void
}

export interface IWidgetSubTabEnumProps {
  unit: IEnumPropertyStatus
  onSelectUnit: (unit: IEnumPropertyStatus) => void
}

export interface IWidgetTabHeaderProps {
  group: IExtendedTUnitGroups
  index: number
  isAllTabsOpened?: boolean
  onToggle: () => void
  onMakeTabFavorite: (
    groupType: DashboardGroupTypes,
    groupName: string,
    groupIndex: number,
  ) => void
}

export interface IFooterPanelProps {
  spareTabs: IExtendedTUnitGroups[]
  filteredGroups: IExtendedTUnitGroups[]
  onChange: (props: IChangeGroupPlaceProps) => void
  onMakeTabFavorite: (
    groupType: DashboardGroupTypes,
    groupName: string,
    grouIndex: number,
  ) => void
}

export interface IColsHeight {
  h: number
  x: number
}
