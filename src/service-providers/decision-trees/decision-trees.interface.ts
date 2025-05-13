import { IStepData } from '@store/dtree/dtree.store'
import {
  DatasetKinds,
  IFuncPropertyStatus,
  ISolutionEntryDescription,
  TCondition,
  TFilteringStat,
  TItemsCount,
  TPropertyStatus,
} from '../common'
import { TGetFullStatUnitsOptions } from '../filtering-regime'
import { TGenomeOptionsKeys } from './../../core/enum/explore-genome-types-enum'

// dtree_set

export enum ActionTypes {
  POINT = 'POINT',
  ATOM = 'ATOM',
  INSTR = 'INSTR',
  DTREE = 'DTREE',
}

export enum DtreeModifyingActions {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type TDtreeModifyingActions = [
  actionType: ActionTypes.DTREE,
  actionName: DtreeModifyingActions,
  decisionTreeName: string,
  rubric?: TGenomeOptionsKeys,
]

export enum InstrModifyingActionNames {
  DUPLICATE = 'DUPLICATE',
  DELETE = 'DELETE',
  NEGATE = 'NEGATE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
  UP_JOIN_AND = 'UP-JOIN-AND',
  UP_JOIN_OR = 'UP-JOIN-OR',
  SPLIT = 'SPLIT',
  BOOL_TRUE = 'BOOL-TRUE',
  BOOL_FALSE = 'BOOL-FALSE',
  LABEL = 'LABEL',
  COMMENTS = 'COMMENTS',
}

export type TInstrModifyingActions = [
  actionType: ActionTypes.INSTR,
  actionName: InstrModifyingActionNames,
  pointNo: number,
  additionalOption?: unknown,
]

export enum PointModyfingActionNames {
  INSERT = 'INSERT',
  REPLACE = 'REPLACE',
  JOIN_AND = 'JOIN-AND',
  JOIN_OR = 'JOIN-OR',
}

export type TPointModifyingActions = [
  actionType: ActionTypes.POINT,
  actionName: PointModyfingActionNames,
  pointNo: number,
  condition: TCondition,
]

export enum AtomModifyingActionName {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export type TAtomModifyingActions = [
  actionType: ActionTypes.ATOM,
  actionName: AtomModifyingActionName,
  atomLocation: number[],
  additionalArgument?: unknown,
]

export type TModifyingAction =
  | TDtreeModifyingActions
  | TInstrModifyingActions
  | TPointModifyingActions
  | TAtomModifyingActions

// dtree_set

export interface IDtreeSetArgumentsBase {
  ds: string
  dtree?: string // used first if present
  code?: string // used second if present, must be present if dtree is not
}
export interface IDtreeSetArguments extends IDtreeSetArgumentsBase {
  tm?: string
  instr?: TModifyingAction
}

export enum DtreeSetPointKinds {
  IF = 'If',
  RETURN = 'Return',
  EMPTY = '',
  LABEL = 'Label',
  ERROR = 'Error',
}

export interface IDtreeSetPoint {
  kind: DtreeSetPointKinds
  level: 0 | 1
  decision: boolean | null
  'code-frag': string
  actions: string[]
}

export type PointCount = TItemsCount | null

export interface IDtreeSetResponse {
  kind: DatasetKinds
  'total-counts': TItemsCount[]
  'point-counts': PointCount[]
  code: string
  points: IDtreeSetPoint[]
  'cond-atoms': Record<string, TCondition[]>
  'err-atoms': Record<string, Map<string, string>>
  labels: string[]
  error?: string
  line?: number
  pos?: number
  'dtree-name'?: string
  'eval-status': 'ok' | string
  hash: string
  'dtree-list': ISolutionEntryDescription[]
  'rq-id': string
}

export interface IDtreeSet extends IDtreeSetResponse {
  steps: IStepData[]
}

// dtree_counts
export interface IDtreeCountsArguments extends IDtreeSetArgumentsBase {
  tm?: string
  rq_id: string
  points: number[]
}

export interface IDtreeCountsResponse {
  'rq-id': string
  'point-counts': PointCount[]
}

export interface IGetFullDreeCountsOptions {
  abortSignal?: AbortSignal
  onPartialResponse?: (response: IDtreeCountsResponse) => void
}

// dtree_stat

export interface IDtreeStatArguments extends IDtreeSetArgumentsBase {
  tm?: number
  no?: string
}

export interface IDtreeStatResponse {
  'total-counts': TItemsCount
  'filtered-counts': TItemsCount
  'stat-list': TPropertyStatus[]
  functions: IFuncPropertyStatus[]
  'rq-id': string
}

// dtree_check

export interface IDtreeCheckArguments {
  ds: string
  code: string
}

export interface IWarning {
  error: string
  line: number
  pos: number
}
export interface IDtreeCheck {
  code: string
  error?: string
  line?: number
  pos?: number
  warnings?: Array<IWarning>
}

// dtree_cmp

export interface IDtreeCmpArguments extends IDtreeSetArgumentsBase {
  other: string
}

export interface IDtreeCmp {
  cmp: string[][]
}

export type TDtreeStat = TFilteringStat

export interface IGetFullDtreeStatParams {
  ds: string
  no: string
  code: string
}

export type TGetFullDtreeStatOptions = TGetFullStatUnitsOptions<TDtreeStat>

export interface IUpdateDecisionTreeParams {
  ds: string
  code: string
  instr: TDtreeModifyingActions
}

export interface IDeleteDecisionTreeParams {
  ds: string
  code: string
  instr: TDtreeModifyingActions
}

export interface ICodeFrags {
  condition: string
  result: string | undefined
  decision: boolean | null
}

// trace variant (optional transcript)

export interface IDtreeTraceVariantData {
  variant: string
  transcript: string
}

export interface IDtreeTraceVariantArguments
  extends IDtreeSetArgumentsBase,
    IDtreeTraceVariantData {}

export type TDtreeTraceBase = {
  'point-no': number
  status: string
}

export type TDtreeTrace = TDtreeTraceBase & {
  transcripts: [string]
}

export type TDtreeTraceResultData = {
  variant: string
  'dtree-name': string
  status?: string
  error?: string
  traces?: [TDtreeTrace]
  'transcript-id'?: string
  trace?: TDtreeTraceBase
}

export type TDtreeTraceVariantResult = [TDtreeTraceResultData, string]
