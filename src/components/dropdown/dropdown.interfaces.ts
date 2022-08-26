export interface IDropdownValue<T> {
  value: T
  label: string
  disabled?: boolean
}

export interface IDropdownCommonProps {
  variant?: 'primary' | 'primary-dark'
}
