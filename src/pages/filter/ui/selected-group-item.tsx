import React, { ReactElement } from 'react'

import { Checkbox } from '@ui/checkbox/checkbox'
import { TVariant } from '@service-providers/common'

interface IProps {
  handleCheckGroupItem: (checked: boolean, variant: TVariant) => void
  variant: TVariant
  isSelected: boolean
}

export const SelectedGroupItem = ({
  isSelected,
  variant,
  handleCheckGroupItem,
}: IProps): ReactElement => {
  const handleCheck = (event: any) => {
    handleCheckGroupItem(event.target.checked, variant)
  }

  return (
    <Checkbox
      id={Math.random()}
      checked={isSelected}
      onChange={handleCheck}
      className="mb-2 text-14"
    >
      <span>{variant[0]}</span>

      <span className="text-grey-blue ml-2">({variant[1]})</span>
    </Checkbox>
  )
}
