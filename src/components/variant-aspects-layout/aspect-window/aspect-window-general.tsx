import { ReactElement } from 'react'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { Button } from '@ui/button'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { OpenIgvPopover } from '../components/open-igv-popover'
import { AspectWindowBase, IAspectWindowBaseProps } from './aspect-window-base'

export const AspectWindowGeneral = ({
  igvUrls,
  ...windowProps
}: IAspectWindowBaseProps): ReactElement => {
  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const handleOpenModal = () => {
    closePopover()
    modalsVisibilityStore.toggleIsIgvModalVisible(true)
  }

  return (
    <AspectWindowBase
      {...windowProps}
      titleAdornment={
        igvUrls && (
          <div className="flex">
            <Button
              className="mx-8 whitespace-nowrap"
              text={t('igv.openIgv')}
              size="xs"
              onClick={e => onToggle(e.currentTarget)}
            />

            <OpenIgvPopover
              igvUrls={igvUrls}
              isOpen={isPopoverOpen}
              anchorEl={popoverAnchor}
              onOpenModal={handleOpenModal}
              onClose={closePopover}
            />
          </div>
        )
      }
    />
  )
}
