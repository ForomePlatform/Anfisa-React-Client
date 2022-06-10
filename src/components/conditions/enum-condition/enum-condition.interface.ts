import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { TVariant } from '@service-providers/common'

export interface IEnumConditionControlsProps {
  value: string[]
  mode: ModeTypes | undefined
  clearValue: () => void
}

export interface IEnumConditionProps {
  attributeName: string | undefined
  enumVariants: TVariant[]
  attributeSubKind: string | undefined
  initialEnumVariants: string[] | undefined
  initialEnumMode: ModeTypes | undefined
  isShowZeroes: boolean
  toggleShowZeroes: (value: boolean) => void
  controls?: (props: IEnumConditionControlsProps) => ReactElement | null
  onTouch?: () => void
}
