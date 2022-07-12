import styles from './variant-drawer.module.css'

import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useScrollToItem } from '@core/hooks/use-scroll-to-item'
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
import { getFoundedValuesNumber } from './variant-drawer.utils'
import { VariantDrawerHeader } from './variant-drawer-header'

interface IVariantDrawerProps {
  className?: string
}

export const VariantDrawer = observer(
  ({ className }: IVariantDrawerProps): ReactElement => {
    const {
      record: { igvUrl, isFetching, aspects },
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

    const refIndex = useRef(0)

    const handleChangeActiveAspect = (aspect: string) => {
      refIndex.current = 0
      setGalleryActiveAspect(aspect)
    }

    const onChange = (value: string) => {
      setSearchValue(value)

      const foundedValues = getFoundedValuesNumber(value, aspects)

      if (value && foundedValues) {
        gridHandles.current?.maximizeAll()
      } else {
        gridHandles.current?.minimizeAll()
        refIndex.current = 0
      }
    }

    useEffect(() => {
      setSearchValue('')
      refIndex.current = 0
    }, [layoutMode])

    useScrollToItem('.aspect-window__content_active', refIndex)

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
              placeholder={t('variant.searchThroughTheTabs')}
              value={searchValue}
              onChange={e => onChange(e.target.value)}
            />
          </div>

          {layoutMode == VariantDrawerLayoutMode.Grid && (
            <VariantAspectsLayoutGrid
              className={styles.drawer__layout}
              aspects={aspects}
              onChangeLayout={setGridLayout}
              layout={gridLayout}
              handles={gridHandles}
              igvUrl={igvUrl}
              searchValue={searchValue}
            />
          )}
          {layoutMode === VariantDrawerLayoutMode.Gallery && (
            <VariantAspectsLayoutGallery
              className={styles.drawer__layout}
              aspects={aspects}
              activeAspect={galleryActiveAspect}
              onChangeActiveAspect={handleChangeActiveAspect}
              igvUrl={igvUrl}
              searchValue={searchValue}
            />
          )}
        </div>
      </div>
    )
  },
)
