import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'

export const approxOptions: IDropdownValue<ApproxNameTypes>[] = Object.values(
  ApproxNameTypes,
).map(value => ({ value, label: value }))
