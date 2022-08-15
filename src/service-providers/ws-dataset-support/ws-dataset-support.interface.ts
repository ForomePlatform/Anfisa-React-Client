import {
  IRecordDescriptor,
  TCondition,
  TItemsCount,
  TZoneSetting,
} from 'service-providers/common/common.interface'

// ws_list

export interface IWsListArguments {
  ds: string | undefined
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  zone?: TZoneSetting[]
}

export interface IWsList {
  ds: string
  totalCounts: TItemsCount
  filteredCounts: TItemsCount
  records: IRecordDescriptor[]
  activeSamples: string
}

// zone_list

export interface IZoneDescriptor {
  zone: string
  title: string
}

export interface IZoneWithVariants extends IZoneDescriptor {
  variants: string[]
}

export interface IZoneVariantsArguments {
  ds: string
  zone: string
}

export interface IZoneListArguments {
  ds: string
}

// ws_tags

export type TTagsDescriptorSpecial = {
  _note?: string
}

export type TTagsDescriptor = TTagsDescriptorSpecial & Record<string, true>

export interface IWsTagsArguments {
  ds: string
  rec: number
  tags?: TTagsDescriptor
}

export interface IWsTags {
  filters: string[]
  checkTags: string[]
  opTags: string[]
  recTags: TTagsDescriptor
  updTime?: string
  updFrom?: string
  tagsState: number
}

// tag_select

export interface ITagSelectArguments {
  ds: string
  tag?: string
}

export interface ITagSelect {
  tagList: string[]
  tag?: string
  tagsState: any
  tagRecList?: number[]
  tagsRecList: number[]
}

// macro_tagging

export interface IMacroTaggingArguments {
  ds: string
  tag: string
  off?: true | any
  filter?: string
  conditions?: ReadonlyArray<TCondition>
  dtree?: string
  code?: string
  no?: string
  smpcnt?: string
  delay?: boolean
}

export interface IMacroTagging {
  task_id: number
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type IMacroTaggingArgumentsSync = Omit<IMacroTaggingArguments, 'delay'>

export type IMacroTaggingArgumentsAsync = WithRequired<
  IMacroTaggingArguments,
  'delay'
>
