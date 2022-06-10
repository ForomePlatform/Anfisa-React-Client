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
  variants: string[]
}

export interface IZoneListArguments {
  ds: string
  zone?: string
}

export type TZoneList = IZoneDescriptor | IZoneDescriptor[]

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
  'tag-list': string[]
  tag?: string
  'tags-state': any
  'tag-rec-list'?: number[]
  'tags-rec-list': number[]
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
}

export interface IMacroTagging {
  task_id: number
}
