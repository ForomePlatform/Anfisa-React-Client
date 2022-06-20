import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import { t, TI18nKey } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dirInfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'
import {
  IPopperMenuProps,
  PopperMenu,
} from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { GlbPagesNames } from '@glb/glb-names'
import { FILTER_REFERRER } from '@pages/filter/common/filter-control/filter-control.const'

export const OpenViewerPanel = ({ close }: IPopperMenuProps): ReactElement => {
  const history = useHistory()

  let pages = Object.values(GlbPagesNames).filter(
    name => name !== GlbPagesNames.Root,
  ) as Exclude<GlbPagesNames, typeof GlbPagesNames.Root>[]

  if (datasetStore.isXL) {
    pages = pages.filter(p => p !== GlbPagesNames.Table)
  }

  const goToPage = (name: GlbPagesNames) => {
    const route = getPageRoute(name)

    SessionStoreManager.write(FILTER_REFERRER, GlbPagesNames.Root)
    history.push(`${route}?ds=${dirInfoStore.selectedDirinfoName}`)
    filterStore.setMethod(name)
  }

  return (
    <PopperMenu close={close}>
      {pages.map((pageName, index) => {
        const shouldRenderOption = pageName !== GlbPagesNames.IGV

        if (!shouldRenderOption) return

        return (
          <PopperMenuItem
            key={index}
            data-testid={DatasetInfoDataCy.viewerOption}
            onClick={() => goToPage(pageName)}
          >
            {t(`home.${pageName}` as TI18nKey)}
          </PopperMenuItem>
        )
      })}
    </PopperMenu>
  )
}
