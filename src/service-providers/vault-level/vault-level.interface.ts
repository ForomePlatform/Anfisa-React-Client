// dirinfo
export type TDocumentDescriptor = [string, string, any?]

export interface IBaseDatasetDescriptor {
  name: string
  kind: 'ws' | 'xl'
  // time in ISO format
  'create-time': string
  // time in ISO format
  'upd-time': null | string
  note: null | string
  // time in ISO format
  'date-note': null | string
  total: number
  // TODO: the real response is different from the documentation
  doc: TDocumentDescriptor
  ancestors: [null | string, TDocumentDescriptor][]
}

export interface IDirInfoDatasetDescriptor extends IBaseDatasetDescriptor {
  secondary?: string[]
}

export interface IDocumentation {
  id: string
  title: string
  url: string
}

export interface IDirInfo {
  version: string
  'ds-list': string[]
  'ds-dict': IDirInfoDatasetDescriptor
  documentation: IDocumentation[]
}

// single_cnt

export interface ISingleCntArgument {
  record: object
}

// job_status

export interface IJobStatusArgument {
  task: string
}

export type TColorCodes =
  | 'grey'
  | 'green'
  | 'yellow'
  | 'yellow-cross'
  | 'red'
  | 'red-cross'

export interface IRecordDescriptor {
  cl: TColorCodes
  lb: string
  no: number
  dt?: string
}

export interface IJobStatusSamples {
  samples: IRecordDescriptor[]
}

export interface IJobStatusRecords {
  records: IRecordDescriptor[]
}

export type TTaskResult = IJobStatusSamples | IJobStatusRecords

export type TJobStatus = null | [false | TTaskResult, string]

// adm_update

export type TAdmUpdateResponse = 'Updated'

// adm_reload_ds

export interface IAdmReloadDsArguments {
  ds: string
}
export type TAdmReloadDsResponse = 'Reloaded <dataset name>'
