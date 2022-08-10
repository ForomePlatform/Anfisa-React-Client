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

export type IExtendedUnit =
  | IExtendedINumericPropertyStatus
  | IExtendedIEnumPropertyStatus
  | IExtendedIFuncPropertyStatus

export interface IExtendedTUnitGroup {
  name: string
  units: IExtendedUnit[]
  isOpen: boolean
  isFavorite: boolean
  power?: number
  attributes?: IExtendedUnit[]
}

export interface IColsHeight {
  h: number
  x: number
}
