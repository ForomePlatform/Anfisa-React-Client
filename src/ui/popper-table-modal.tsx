import { ReactElement, useRef } from 'react'
import noop from 'lodash/noop'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { InputSearch } from './input-search'

interface Props {
  title: string
  selectedAmount: number
  searchValue: string
  searchInputPlaceholder?: string
  children: ReactElement
  onClearAll?: () => void
  onClose?: () => void
  onApply?: () => void
  onChange?: (value: string) => void
}

export const PopperTableModal = ({
  title,
  selectedAmount,
  searchValue,
  searchInputPlaceholder,
  children,
  onClearAll,
  onClose,
  onApply,
  onChange,
}: Props) => {
  const ref = useRef(null)

  useOutsideClick(ref, onClose ?? noop)

  return (
    <div className="bg-white shadow-card rounded" ref={ref}>
      <div className="px-4 pt-4">
        <p className="text-16 text-blue-dark mb-5 ">{title}</p>

        <InputSearch
          value={searchValue}
          placeholder={searchInputPlaceholder}
          onChange={e => onChange && onChange(e.target.value)}
        />

        <div className="flex justify-between mt-5">
          <span className="text-14 text-grey-blue">
            {selectedAmount} Selected
          </span>
          <span
            className="text-12 text-blue-bright leading-14 cursor-pointer"
            onClick={onClearAll}
          >
            {t('general.clearAll')}
          </span>
        </div>
      </div>

      <div className="w-full pl-4">{children}</div>

      <div className="flex justify-end pb-4 px-4 mt-4">
        <Button text={t('general.cancel')} onClick={onClose} />
        <Button text={t('general.apply')} className="ml-3" onClick={onApply} />
      </div>
    </div>
  )
}
