import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { IPopoverButtonBaseProps } from '@ui/popover/popover.interface'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'

export const OpenViewerButton = ({
  isOpen,
  onClick,
}: IPopoverButtonBaseProps) => (
  <Button
    text={t('home.openInViewer')}
    onClick={e => onClick(e.currentTarget)}
    dataTestId={DatasetInfoDataCy.openInViewer}
    size="sm"
    append={
      <Icon
        name="Arrow"
        size={14}
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)