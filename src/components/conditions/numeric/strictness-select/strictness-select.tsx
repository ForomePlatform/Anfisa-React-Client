import { ReactElement } from 'react'

import { StrictnessSelectButton } from './strictness-select-button'

export interface IStrictnessSelectProps {
  value: boolean
  onChange: (newValue: boolean) => void
  isDisabled?: boolean
}

export const StrictnessSelect = ({
  value,
  onChange,
  isDisabled,
}: IStrictnessSelectProps): ReactElement => (
  <StrictnessSelectButton
    value={value}
    disabled={isDisabled}
    onChange={onChange}
  />
)
