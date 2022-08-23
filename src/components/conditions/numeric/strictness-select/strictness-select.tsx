import { ReactElement } from 'react'

import { NumericSelectTypes } from '@core/enum/numeric-select-types-enum'
import { StrictnessSelectButton } from './strictness-select-button'

export interface IStrictnessSelectProps {
  value: boolean
  selectType: NumericSelectTypes
  onChange: (newValue: boolean) => void
  isDisabled?: boolean
}

export const StrictnessSelect = ({
  value,
  selectType,
  onChange,
  isDisabled,
}: IStrictnessSelectProps): ReactElement => (
  <StrictnessSelectButton
    value={value}
    disabled={isDisabled}
    selectType={selectType}
    onChange={onChange}
  />
)
