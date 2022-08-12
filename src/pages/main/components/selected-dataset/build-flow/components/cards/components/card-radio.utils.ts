import { IDisabledOption } from './card-radio-list.interface'

export const disabledOptionIsObject = (
  value: boolean | IDisabledOption | undefined,
): value is IDisabledOption => {
  return typeof value === 'object'
}
