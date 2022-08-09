export interface Row<T> {
  field: T
  fieldName: string
  optional?: true
  render?: (value: any) => string | Element | null
}
