import styles from './variant-drawer.module.css'

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { theme } from '@theme'
import variantStore from '@store/ws/variant'
import { InputSearch } from '@ui/input'
import { Loader } from '@ui/loader'
import {
  TVariantAspectsGridHandles,
  VariantAspectsLayoutGallery,
  VariantAspectsLayoutGrid,
} from '@components/variant-aspects-layout'
import { variantDrawerStore } from '@pages/ws/ui/variant-drawer/variant-drawer.store'
import { VariantDrawerLayoutMode } from './variant-drawer.interface'
import { getFoundedValuesNumber, scrollToItem } from './variant-drawer.utils'
import { VariantDrawerHeader } from './variant-drawer-header'

interface IVariantDrawerProps {
  className?: string
}

export const VariantDrawer = observer(
  ({ className }: IVariantDrawerProps): ReactElement => {
    const {
      record: { aspects, igvParams, isLoading },
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

    const [searchValue, setSearchValue] = useState<string>('')
    const [foundItems, setFoundItems] = useState<number>(0)
    const refIndex = useRef(0)

    const handleChangeActiveAspect = (aspect: string) => {
      refIndex.current = 0
      setGalleryActiveAspect(aspect)
    }

    const onChange = (value: string) => {
      setSearchValue(value)

      const foundItems = getFoundedValuesNumber(value, aspects)

      setFoundItems(foundItems)

      if (value && foundItems) {
        gridHandles.current?.maximizeAll()
      } else {
        gridHandles.current?.minimizeAll()
        refIndex.current = 0
      }
    }

    const detectKey = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        scrollToItem('.aspect-window__content_active', refIndex)
      }
    }, [])

    useEffect(() => {
      setSearchValue('')
      refIndex.current = 0

      return () => {
        window.removeEventListener('keydown', detectKey, true)
      }
    }, [layoutMode, detectKey])

    const addListener = () => {
      window.addEventListener('keydown', detectKey, true)
    }

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
          {isLoading ? (
            <div className={styles.drawer__loader}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles.drawer__search}>
                <InputSearch
                  placeholder={t('variant.searchThroughTheTabs')}
                  value={searchValue}
                  variant="primary-dark"
                  size="m"
                  style={{
                    backgroundColor: theme('colors.blue.secondary'),
                    border: theme('colors.blue.secondary'),
                  }}
                  onChange={e => onChange(e.target.value)}
                  onFocus={addListener}
                  foundItems={foundItems}
                />
              </div>

              {layoutMode == VariantDrawerLayoutMode.Grid && (
                <VariantAspectsLayoutGrid
                  className={styles.drawer__layout}
                  aspects={aspects}
                  onChangeLayout={setGridLayout}
                  layout={gridLayout}
                  handles={gridHandles}
                  searchValue={searchValue}
                  igvUrlSearchParams={igvUrlSearchParams}
                />
              )}
              {layoutMode === VariantDrawerLayoutMode.Gallery && (
                <VariantAspectsLayoutGallery
                  className={styles.drawer__layout}
                  aspects={aspects}
                  activeAspect={galleryActiveAspect}
                  onChangeActiveAspect={handleChangeActiveAspect}
                  searchValue={searchValue}
                  igvUrlSearchParams={igvUrlSearchParams}
                />
              )}
            </>
          )}
        </div>
      </div>
    )
  },
)
