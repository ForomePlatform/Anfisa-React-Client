import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { TVariant } from '@service-providers/common'
import { ICommonControlProps } from '../conditions.interface'

export interface IEnumConditionControlsProps
  extends Omit<ICommonControlProps, 'hasErrors'> {
  value: string[]
}

export interface IEnumConditionProps {
  attributeName: string | undefined
  enumVariants: TVariant[]
  attributeSubKind: string | undefined
  initialVariants: string[] | undefined
  initialEnumMode: ModeTypes | undefined
  isShowZeroes: boolean
  isDataReady: boolean
  listHeight: string
  selectedDashboardVariants?: string[]
  toggleShowZeroes: (value: boolean) => void
  controls?: (props: IEnumConditionControlsProps) => ReactElement | null
  onTouch?: () => void
}
