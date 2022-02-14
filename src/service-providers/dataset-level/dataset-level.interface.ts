import { TCondition } from 'service-providers/filtering-regime/filtering-regime.interface'
import { IBaseDatasetDescriptor } from 'service-providers/vault-level/vault-level.interface'

// dsinfo

export interface IDsInfoArguments {
  ds: string
  note?: string
}
export interface IDsInfoClass {
  title: string
  values: string[]
}

export interface IDsInfo extends IBaseDatasetDescriptor {
  meta: object
  classes: IDsInfoClass[]
  'unit-groups': string[]
  cohorts: string[]
  'export-max-count': number
}

// ds_list

export interface IDsListArguments {
  ds: string
  filter?: string
  conditions?: TCondition[]
  dtree?: string
  code?: string
  no?: string
  smpcnt?: string
}
export interface IDsList {
  task_id: string
}

// reccnt

export interface IReccntArguments {
  ds: string
  rec: number
  details?: number
  samples?: number[]
}

export interface ICommonAspectDescriptor {
  name: string
  title: string
  kind: 'norm' | 'tech'
  type: 'table' | 'pre'
}

export interface IAttributeDescriptors {
  name: string
  title: string
  cells: [string, string][]
  tooltip: string | undefined
  render: string | undefined
}

export interface ITableAspectDescriptor extends ICommonAspectDescriptor {
  columns: number
  colhead: null | [string, number][]
  colgroup?: null | string[]
  rows: [] | IAttributeDescriptors[]
  parcontrol: string | undefined
  parmodes: object[] | undefined
}

export interface IPreAspectDescriptor extends ICommonAspectDescriptor {
  content: string
}

// recdata

export interface IRecdataArguments {
  ds: string
  rec: number
}
export type TRecdata = any

// tab_report

export interface ITabReportArguments {
  ds: string
  seq: number[]
  schema: string
}
export type TTabReport = any[]

// vsetup

export interface IVsetupArguments {
  ds: string
}

export interface IVsetupAspectDescriptor {
  name: string
  title: string
  source: 'view' | 'data'
  field?: string
  ignored: boolean
  col_groups?: [string, number][]
  attrs: {
    name: string
    title: string
    kind: string
    is_seq: boolean
    tooltip?: string
  }[]
}

// solutions

export interface ISolutionsArguments {
  ds: string
}

export interface ISolutions {
  [nameOfSolution: string]: string[]
}
