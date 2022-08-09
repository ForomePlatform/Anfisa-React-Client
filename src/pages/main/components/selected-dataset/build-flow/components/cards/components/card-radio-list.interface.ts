export interface ICardRadioItem<T extends string> {
  label: string
  value: T
}

export interface IDisabledOption {
  isDisabled: boolean
  placeholder: () => JSX.Element
}

export type TDisabledOptions<T extends string> = Record<
  T,
  boolean | IDisabledOption
>
