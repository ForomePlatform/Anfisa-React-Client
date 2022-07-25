import cn, { Argument } from 'classnames'

import { Button } from '@ui/button'
import { CardTitle } from '@ui/card'

interface ICardTitleWithEditProps {
  title: string
  onEdit: () => void
  className?: Argument
  isEditShown?: boolean
}

export const CardTitleWithEdit = ({
  title,
  onEdit,
  className,
  isEditShown = false,
}: ICardTitleWithEditProps) => (
  <div className={cn('flex items-center justify-between', className)}>
    <CardTitle text={title} />

    {isEditShown && (
      <Button
        text="Edit choice"
        variant="no-border"
        style={{ padding: 0 }}
        onClick={onEdit}
      />
    )}
  </div>
)
