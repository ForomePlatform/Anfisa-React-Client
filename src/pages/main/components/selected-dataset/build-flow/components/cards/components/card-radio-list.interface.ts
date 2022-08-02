export interface ICardRadioItem<T extends string> {
  label: string
  value: T
}

export type TDisabledOptions<T extends string> = Record<T, boolean>
