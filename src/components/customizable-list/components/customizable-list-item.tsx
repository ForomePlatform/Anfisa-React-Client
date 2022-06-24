import { ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'

interface IColumnNameItemProps {
  title: ReactNode
  isChecked: boolean
  onClickSwitch: (checked: boolean) => void
}

export const CustomizableListItem = ({
  title,
  onClickSwitch,
  isChecked,
}: IColumnNameItemProps): ReactElement => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon name="Dnd" />
        <span className={cn('text-12 my-1', { 'font-medium': isChecked })}>
          {title}
        </span>
      </div>

      <Switch onChange={onClickSwitch} isChecked={isChecked} />
    </div>
  )
}
