import {
  ISolutionEntryDescription,
  TCondition,
  TCount,
  TPropertyStatus,
} from 'service-providers/filtering-regime/filtering-regime.interface'

// dtree_set

export type TDtreeModyfyingActions = ['DTREE', 'UPDATE' | 'DELETE', string]

export type TInstrModyfingActionName =
  | 'DUPLICATE'
  | 'DELETE'
  | 'NEGATE'
  | 'JOIN-AND'
  | 'JOIN-OR'
  | 'SPLIT'
  | 'BOOL-TRUE'
  | 'BOOL-FALSE'
  | 'LABEL'
  | 'COMMENTS'

export type TInstrModyfingActions = [
  'INSTR',
  TInstrModyfingActionName,
  number,
  any,
]

export type TPointModyfingActionName =
  | 'INSERT'
  | 'REPLACE'
  | 'JOIN-AND'
  | 'JOIN-OR'

export type TPointModyfingActions = [
  'POINT',
  TPointModyfingActionName,
  number,
  TCondition,
]

export type TAtomModyfingActionName = 'EDIT' | 'DELETE'

export type TAtomModyfingActions = [
  'ATOM',
  TAtomModyfingActionName,
  [number, number],
  any,
]

export type TModyfyingAction =
  | TDtreeModyfyingActions
  | TInstrModyfingActions
  | TPointModyfingActions
  | TAtomModyfingActions

export interface IDtreeSetArguments {
  ds: string
  tm?: string
  dtree?: string
  code?: string
  instr: TModyfyingAction
}

export interface IDtreeSetPoint {
  kind: 'If' | 'Return' | '' | 'Label' | 'Error'
  level: 0 | 1
  decision: boolean | null
  'code-frag': string
  actions: string[]
}

export type PointCount = TCount | null

export interface IDtreeSet {
  kind: 'ws' | 'xl'
  'total-counts': TCount[]
  'point-counts': PointCount[]
  code: string
  points: IDtreeSetPoint[]
  'cond-atoms': {
    [pointNumber: number]: TCondition[]
  }
  labels: string[]
  error?: string
  line?: number
  pos?: number
  'dtree-name'?: string
  'eval-status': 'ok' | string
  hash: string
  'dtree-list': ISolutionEntryDescription[]
  rq_id: string
}

// dtree_counts

export interface IDtreeCountsArguments {
  ds: string
  tm?: string
  rq_id: string
  dtree?: string
  code?: string
  points: number[]
}

export interface IDtreeCounts {
  'rq-id': string
  'point-counts': PointCount[]
}

// dtree_stat

export interface IDtreeStatArguments {
  ds: string
  tm?: string
  dtree?: string
  code?: string
  no?: string
}

export interface IDtreeStat {
  'total-counts': TCount[]
  'filtered-counts': TCount[]
  'stat-list': TPropertyStatus[]
  rq_id: string
}

// dtree_check

export interface IDtreeCheckArguments {
  ds: string
  code: string
}

export interface IDtreeCheck {
  code: string
  error?: string
  line?: number
  pos?: number
}

// dtree_cmp

export interface IDtreeCmpArguments {
  ds: string
  dtree?: string
  code?: string
  other: string
}

export interface IDtreeCmp {
  cmp: string[][]
}
