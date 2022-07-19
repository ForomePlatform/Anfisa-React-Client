import styles from './variant-content.module.css'

import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'

// import { useScrollToItem } from '@core/hooks/use-scroll-to-item'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { InputSearch } from '@components/input-search'
import { VariantAspectsLayoutGallery } from '@components/variant-aspects-layout'
import { ReturnedVariantsDataCy } from '@data-testid'
import {
  getFoundedValuesNumber,
  scrollToItem,
} from '@pages/ws/ui/variant-drawer/variant-drawer.utils'
import { TAspectDescriptor } from '@service-providers/dataset-level'

interface IVariantContentProps {
  className?: string
  title: ReactNode
  onClose: () => void
  isLoading?: boolean
  aspects: TAspectDescriptor[]
  igvUrlSearchParams?: string
}

export const VariantContent = ({
  className,
  title,
  onClose,
  isLoading,
  aspects,
  igvUrlSearchParams,
}: IVariantContentProps): ReactElement => {
  const [activeAspect, setActiveAspect] = useState('')

  const [searchValue, setSearchValue] = useState<string>('')
  const [foundItems, setFoundItems] = useState<number>(0)

  const refIndex = useRef(0)

  const onChange = (value: string) => {
    setSearchValue(value)
    setFoundItems(getFoundedValuesNumber(value, aspects))
    if (!value) {
      refIndex.current = 0
    }
  }

  const detectKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      scrollToItem('.aspect-window__content_active', refIndex)
    }
  }, [])

  useEffect(() => {
    return () => {
      refIndex.current = 0
      setSearchValue('')

      window.removeEventListener('keydown', detectKey, true)
    }
  }, [detectKey])

  const addListener = () => {
    window.addEventListener('keydown', detectKey, true)
  }

  return (
    <div className={cn(styles.variantContent, className)}>
      <div
        className={styles.variantContent__header}
        data-testid={ReturnedVariantsDataCy.returnedVariantsHeader}
      >
        <div className={styles.variantContent__title}>{title}</div>
        <button className={styles.variantContent__close}>
          <Icon name="Close" onClick={onClose} size={16} />
        </button>
      </div>
      {isLoading ? (
        <Loader className={styles.variantContent__aspects} />
      ) : (
        <>
          <div className={styles.variantContent__search}>
            <InputSearch
              placeholder={t('variant.searchThroughTheTabs')}
              value={searchValue}
              onChange={e => onChange(e.target.value)}
              onFocus={addListener}
              foundItems={foundItems}
            />
          </div>

          <VariantAspectsLayoutGallery
            className={styles.variantContent__aspects}
            activeAspect={activeAspect}
            onChangeActiveAspect={setActiveAspect}
            aspects={aspects}
            igvUrlSearchParams={igvUrlSearchParams}
            searchValue={searchValue}
          />
        </>
      )}
    </div>
  )
}
