import styles from './variant-drawer.module.css'

import { ReactElement, useRef } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import variantStore from '@store/ws/variant'
import { Loader } from '@ui/loader'
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
      record: { aspects, igvParams, isFetching },
    } = variantStore

    const igvUrlSearchParams = igvParams?.igvUrlSearchParams

    const {
      layoutMode,
      gridLayout,
      gridWindowsOpenState,
      setGridLayout,
      galleryActiveAspect,
      setGalleryActiveAspect,
    } = variantDrawerStore

    const gridHandles = useRef<TVariantAspectsGridHandles>(null)

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
          {layoutMode == VariantDrawerLayoutMode.Grid && (
            <VariantAspectsLayoutGrid
              className={styles.drawer__layout}
              aspects={aspects}
              onChangeLayout={setGridLayout}
              layout={gridLayout}
              handles={gridHandles}
              igvUrlSearchParams={igvUrlSearchParams}
            />
          )}
          {layoutMode === VariantDrawerLayoutMode.Gallery && (
            <VariantAspectsLayoutGallery
              className={styles.drawer__layout}
              aspects={aspects}
              activeAspect={galleryActiveAspect}
              onChangeActiveAspect={setGalleryActiveAspect}
              igvUrlSearchParams={igvUrlSearchParams}
            />
          )}
        </div>
      </div>
    )
  },
)
