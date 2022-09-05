export interface IDropdownValue<T> {
  value: T
  label: string
  disabled?: boolean
}

export interface IDropdownCommonProps<T> {
  onChange: (item: IDropdownValue<T>) => void
  values: IDropdownValue<T>[]
  variant?: 'primary' | 'primary-dark'
  showCheckboxes?: boolean
}
