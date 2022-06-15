import { ComponentType } from 'react'

import { TI18nKey } from '@i18n'
import { ITabReportRecord } from '@service-providers/dataset-level'
import { ICellProps } from '../cell'

export interface IVariantsTableColumn {
  name: string
  title: TI18nKey
  component: ComponentType<ICellProps>
  width: number
  grow?: number
  isSticky?: boolean
}

export interface ITableLayout {
  width: number
  cellWidths: number[]
  stickyPos: (number | false)[]
}

export interface IVariantsTableLayoutProps {
  columns: IVariantsTableColumn[]
  layout: ITableLayout
  isCompact?: boolean
  onRowClick?: (row: ITabReportRecord) => void
  selectedVariantNo?: number
}
