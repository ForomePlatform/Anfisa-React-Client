import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'

export const HandleDatasetButton = ({ onClick }: IPopoverButtonBaseProps) => {
  return (
    <Button
      onClick={e => onClick(e.currentTarget)}
      className="rounded"
      size="md"
      icon={<Icon name="Ellipsis" />}
      style={{
        width: '36px',
        height: '28px',
        justifyContent: 'center',
      }}
    />
  )
}
