import styles from './variant-content.module.css'

import React, { ReactElement, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'

import { useScrollToItem } from '@core/hooks/use-scroll-to-item'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { InputSearch } from '@components/input-search'
import { VariantAspectsLayoutGallery } from '@components/variant-aspects-layout'
import { TAspectDescriptor } from '@service-providers/dataset-level'

interface IVariantContentProps {
  className?: string
  title: ReactNode
  onClose: () => void
  isLoading?: boolean
  aspects: TAspectDescriptor[]
  igvUrl?: string
}

export const VariantContent = ({
  className,
  title,
  onClose,
  isLoading,
  aspects,
  igvUrl,
}: IVariantContentProps): ReactElement => {
  const [activeAspect, setActiveAspect] = useState('')

  const [searchValue, setSearchValue] = useState<string>('')
  const refIndex = useRef(0)

  const onChange = (value: string) => {
    setSearchValue(value)

    if (!value) {
      refIndex.current = 0
    }
  }

  useScrollToItem('.aspect-window__content_active', refIndex)

  return (
    <div className={cn(styles.variantContent, className)}>
      <div className={styles.variantContent__header}>
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
            />
          </div>

          <VariantAspectsLayoutGallery
            className={styles.variantContent__aspects}
            activeAspect={activeAspect}
            onChangeActiveAspect={setActiveAspect}
            aspects={aspects}
            igvUrl={igvUrl}
            searchValue={searchValue}
          />
        </>
      )}
    </div>
  )
}
