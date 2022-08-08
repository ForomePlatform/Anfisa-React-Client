import { Layout } from 'react-grid-layout'

import { DashboardGroupTypes } from '@core/enum/dashboard-group-types-enum'
import { TStatusWithPredictionPower } from '@store/stat-units'
import {
  IEnumPropertyStatus,
  IFuncPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'

export type ModifySet<T> = T | ((value: T) => T)

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

export type TExtendedUnit =
  | IExtendedINumericPropertyStatus
  | IExtendedIEnumPropertyStatus
  | IExtendedIFuncPropertyStatus

export interface IExtendedTUnitGroup {
  name: string
  units: TExtendedUnit[]
  isOpen: boolean
  isFavorite: boolean
  power?: number
  attributes?: TExtendedUnit[]
}

export interface IChangeHeightProps {
  index: number
  id: string
  isOpen: boolean
}

export interface IGetLayoutOnHeightChange extends IChangeHeightProps {
  mainTabsLayout: Layout[]
}

export interface IWidgetSubTabNumericProps {
  unit: INumericPropertyStatus
}

export interface IWidgetSubTabEnumProps {
  unit: IEnumPropertyStatus
}

export interface IWidgetTabHeaderProps {
  group: IExtendedTUnitGroup
  isAllTabsOpened?: boolean
  onToggle: () => void
}

export interface IColsHeight {
  h: number
  x: number
}
