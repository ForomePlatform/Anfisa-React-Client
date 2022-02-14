// ds_stat

export type TNumericCondition = [
  'numeric',
  string,
  [number | null, boolean, number | null, boolean],
]

export type TJoinMode = 'OR' | 'AND' | 'NOT'

export type TEnumCondition = ['enum', string, TJoinMode, string[]]
export type TFuncCondition = ['func', string, TJoinMode, string[], any]

export type TCondition = TNumericCondition | TEnumCondition | TFuncCondition

export interface IDsStatArguments {
  ds: string
  tm?: number
  filter?: string
  conditions: TCondition[]
  instr?: ['UPDATE' | 'DELETE' | 'JOIN', string]
}

export type TAttribute = 'numeric' | 'enum' | 'func'

export interface IBasePropertyStatus {
  name: string
  kind: TAttribute
  vgroup: string
  title?: string
  'sub-kind'?: string
  'render-mode'?: string
  tooltip?: string
  incomplete?: true
  detailed?: true
  classes?: number[][]
}

export type TVariant = [string, number]

export interface INumericPropertyStatus extends IBasePropertyStatus {
  min?: number
  max?: number
  counts?: [[number], [number]?, [number]?]
  histogram?: ['LIN' | 'LOG', number, number, number[]]
  'sub-kind': 'int' | 'float' | 'transcript-int' | 'transcript-float'
}

export interface IEnumPropertyStatus extends IBasePropertyStatus {
  variants?: TVariant[]
  'sub-kind': 'status' | 'multi' | 'transcript-status' | 'transcript-multi'
}

export interface IFuncPropertyStatus extends IBasePropertyStatus {
  variants?: TVariant[]
  err?: string
  'rq-id': string
  no?: string
}

export type TPropertyStatus =
  | INumericPropertyStatus
  | IEnumPropertyStatus
  | IFuncPropertyStatus

export interface ISolutionEntryDescription {
  name: string
  standard: boolean
  'eval-status': 'ok' | 'runtime' | 'error'
  'upd-time'?: string
  'upd-from'?: string
  'sol-version': string
}

export type TCount = [number, number?, number?]

export interface IDsStat {
  kind: 'ws' | 'xl'
  'total-counts': TCount
  'filtered-counts': TCount
  'stat-list': TPropertyStatus[]
  'cur-filter'?: null | string
  conditions: TCondition[]
  'cond-seq': [string, string?, string?][]
  'eval-status': 'ok' | string
  hash: string
  'filter-list': ISolutionEntryDescription[]
  'rq-id': string
}

// statunits

export interface IStatunitsArguments {
  ds: string
  tm?: string
  rq_id: string
  filter?: string
  conditions?: TCondition[]
  dtree?: string
  code?: string
  no?: string
  units: string[]
}

export interface IStatunits {
  'rq-id': string
  units: TPropertyStatus[]
}

// statfunc

export interface IStatfuncArguments {
  ds: string
  rq_id: string
  filter?: string
  conditions?: TCondition[]
  dtree?: string
  code?: string
  no?: string
  unit: string
  param: string
}

export type IStatfunc = IFuncPropertyStatus
