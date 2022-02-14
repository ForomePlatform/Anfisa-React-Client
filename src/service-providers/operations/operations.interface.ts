import { TCondition } from 'service-providers/filtering-regime/filtering-regime.interface'

export interface IBaseExportArguments {
  ds: string
  filter?: string
  conditions?: TCondition[]
}

// export

export type TZoneSetting = [string, string[], false?]

export interface IExportOpearationArguments extends IBaseExportArguments {
  zone?: TZoneSetting[]
}

export interface IExportOpearation {
  kind: 'excel'
  fname: string
}

// csv_export

export interface ICsvExportArguments extends IExportOpearationArguments {
  schema: string
}

// ds2ws

export interface IDs2WsArguments extends IBaseExportArguments {
  dtree?: string
  code?: string
  ws: string
  force?: string
}

export interface IDs2WsArgument {
  task_id: string
}
