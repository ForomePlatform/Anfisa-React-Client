import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'
import { PopperButton } from '@components/popper-button'
import {
  ISimplePopperModalProps,
  SimplePopperModal,
} from '@components/simple-popper-modal/simple-popper-modal'
import { SimplePopperModalItem } from '@components/simple-popper-modal/simple-popper-modal-item'
import { GlbPagesNames } from '@glb/glb-names'

interface PropsButton {
  isOpen?: boolean
  refEl: any
  onClick?: () => void
}

const ButtonBase = ({ isOpen, refEl, ...rest }: PropsButton): ReactElement => (
  <Button
    text={t('home.openInViewer')}
    dataTestId={DatasetInfoDataCy.openInViewer}
    refEl={refEl}
    size="md"
    onClick={rest.onClick}
    append={
      <Icon
        name="Arrow"
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)

const Panel = ({ close }: ISimplePopperModalProps): ReactElement => {
  const history = useHistory()

  let pages = Object.values(GlbPagesNames).filter(
    name => name !== GlbPagesNames.Root,
  )

  if (datasetStore.isXL) {
    pages = pages.filter(p => p !== GlbPagesNames.Table)
  }

  const goToPage = (name: GlbPagesNames) => {
    const route = getPageRoute(name)

    history.push(`${route}?ds=${dirinfoStore.selectedDirinfoName}`)
    filterStore.setMethod(name)
  }

  return (
    <SimplePopperModal close={close}>
      {pages.map((pageName, index) => {
        const shouldRenderOption = pageName !== GlbPagesNames.IGV

        if (!shouldRenderOption) return

        return (
          <SimplePopperModalItem
            key={index}
            data-testid={DatasetInfoDataCy.viewerOption}
            onClick={() => {
              datasetStore.setIsXL(dirinfoStore.dsinfo.kind === 'xl')
              goToPage(pageName)
            }}
          >
            {t(`home.${pageName}`)}
          </SimplePopperModalItem>
        )
      })}
    </SimplePopperModal>
  )
}

export const OpenViewerButton = observer(() => {
  return <PopperButton ButtonElement={ButtonBase} ModalElement={Panel} />
})
