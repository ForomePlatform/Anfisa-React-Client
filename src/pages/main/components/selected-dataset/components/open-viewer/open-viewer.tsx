import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { GlbPagesNames } from '@glb/glb-names'
import { OpenViewerButton } from './open-viewer-button'
import { OpenViewerPopover } from './open-viewer-popover'

export const OpenViewer = observer(() => {
  const history = useHistory()

  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  let pages = Object.values(GlbPagesNames).filter(
    name => name !== GlbPagesNames.Root,
  ) as Exclude<GlbPagesNames, typeof GlbPagesNames.Root>[]

  if (datasetStore.isXL) {
    pages = pages.filter(p => p !== GlbPagesNames.Table)
  }

  const goToPage = (name: GlbPagesNames) => {
    const route = getPageRoute(name)

    history.push(`${route}?ds=${dirInfoStore.selectedDirinfoName}`)
    filterStore.setMethod(name)
  }
  return (
    <>
      <OpenViewerButton isOpen={isPopoverOpen} onClick={onToggle} />

      <OpenViewerPopover
        pages={pages}
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        goToPage={goToPage}
        onClose={closePopover}
      />
    </>
  )
})
