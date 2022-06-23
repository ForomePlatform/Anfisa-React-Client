import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { AspectWindowBase, IAspectWindowBaseProps } from './aspect-window-base'

export const AspectWindowGeneral = ({
  igvUrls,
  ...windowProps
}: IAspectWindowBaseProps): ReactElement => {
  return (
    <>
      <AspectWindowBase
        {...windowProps}
        titleAdornment={
          igvUrls?.length && (
            <div className="flex">
              <Button
                className="mx-8 whitespace-nowrap"
                text={t('igv.openIgv')}
                size="xs"
                onClick={() =>
                  modalsVisibilityStore.toggleIsIgvModalVisible(true)
                }
              />
            </div>
          )
        }
      />
    </>
  )
}
