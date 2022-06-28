import styles from './variant-drawer.module.css'

import { ReactElement, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Loader } from '@ui/loader'
import { InputSearch } from '@components/input-search'
import {
  TVariantAspectsGridHandles,
  VariantAspectsLayoutGallery,
  VariantAspectsLayoutGrid,
} from '@components/variant-aspects-layout'
import { variantDrawerStore } from '@pages/ws/ui/variant-drawer/variant-drawer.store'
import { VariantDrawerLayoutMode } from './variant-drawer.interface'
import { VariantDrawerHeader } from './variant-drawer-header'

interface IVariantDrawerProps {
  className?: string
}

export const VariantDrawer = observer(
  ({ className }: IVariantDrawerProps): ReactElement => {
    const {
      record: { igvUrl, isFetching },
    } = variantStore

    const {
      layoutMode,
      gridLayout,
      gridWindowsOpenState,
      setGridLayout,
      galleryActiveAspect,
      setGalleryActiveAspect,
    } = variantDrawerStore

    const gridHandles = useRef<TVariantAspectsGridHandles>(null)

    const [searchValue, setSearchValue] = useState<string>('')

    const filteredAspects = variantStore.getAspects(searchValue)

    return (
      <div className={cn(styles.drawer, className)}>
        <VariantDrawerHeader
          className={styles.drawer__header}
          windowsOpenState={gridWindowsOpenState}
          onWindowsToggle={state => {
            if (state) {
              gridHandles.current?.maximizeAll()
            } else {
              gridHandles.current?.minimizeAll()
            }
          }}
        />
        <div className={styles.drawer__content}>
          {isFetching && (
            <div className={styles.drawer__loader}>
              <Loader />
            </div>
          )}
          <div className={styles.drawer__search}>
            <InputSearch
              placeholder={t('filter.searchForAField')}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>

          {layoutMode == VariantDrawerLayoutMode.Grid && (
            <VariantAspectsLayoutGrid
              className={styles.drawer__layout}
              aspects={filteredAspects}
              onChangeLayout={setGridLayout}
              layout={gridLayout}
              handles={gridHandles}
              igvUrl={igvUrl}
            />
          )}
          {layoutMode === VariantDrawerLayoutMode.Gallery && (
            <VariantAspectsLayoutGallery
              className={styles.drawer__layout}
              aspects={filteredAspects}
              activeAspect={galleryActiveAspect}
              onChangeActiveAspect={setGalleryActiveAspect}
              igvUrl={igvUrl}
            />
          )}
        </div>
      </div>
    )
  },
)
