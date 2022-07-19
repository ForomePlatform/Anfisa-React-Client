import cn, { Argument } from 'classnames'

import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'

interface ICardTitleWithEditProps {
  title: string
  isEditDisabled?: boolean
  onEdit: () => void
  className?: Argument
}

export const CardTitleWithEdit = ({
  title,
  isEditDisabled,
  onEdit,
  className,
}: ICardTitleWithEditProps) => (
  <div className={cn('flex items-center justify-between', className)}>
    <CardTitle text={title} className="text-16" />

    <Button
      variant="secondary"
      style={{ padding: 0 }}
      icon={
        <Icon
          name="Edit"
          className={cn(
            'cursor-pointer',
            isEditDisabled ? 'text-grey-blue' : 'text-blue-bright',
          )}
        />
      }
      disabled={isEditDisabled}
      onClick={onEdit}
    />
  </div>
)
