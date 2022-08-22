import React, { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { Checkbox } from '@ui/checkbox/checkbox'
import { TVariant } from '@service-providers/common'

interface ISelectedGroupItemProps {
  id: string
  handleCheckGroupItem: (checked: boolean, variant: TVariant) => void
  variant: TVariant
  isSelected: boolean
  className?: Argument
}

export const SelectedGroupItem = ({
  id,
  isSelected,
  variant,
  handleCheckGroupItem,
  className,
}: ISelectedGroupItemProps): ReactElement => {
  const handleCheck = (event: any) => {
    handleCheckGroupItem(event.target.checked, variant)
  }

  const [variantName, variantValue] = variant

  return (
    <div id={id} className={cn('w-full flex items-center', className)}>
      <Checkbox
        id={variantName + variantValue}
        checked={isSelected}
        onChange={handleCheck}
        className={cn('flex items-center')}
      >
        <span className="leading-6 text-14">{variantName}</span>

        <span className="ml-2 text-grey-dark text-10">
          {variantValue} variants
        </span>
      </Checkbox>
    </div>
  )
}
