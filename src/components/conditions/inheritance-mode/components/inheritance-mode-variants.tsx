import { ChangeEvent, ReactElement } from 'react'
import cn from 'classnames'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Loader } from '@ui/loader'
import { IInheritanceModeVariantsProps } from '../inheritance-mode.interface'

export const InheritanceModeVariants = ({
  filteredVariants,
  selectedVariants,
  isFetching,
  status,
  className,
  handleSetVariants,
}: IInheritanceModeVariantsProps): ReactElement => (
  <div className={cn('flex flex-col text-14', className)}>
    <>
      {isFetching ? (
        <Loader size="s" className="my-[3px]" />
      ) : filteredVariants?.length > 0 ? (
        filteredVariants.map(([variantName, variantValue]) => (
          <Checkbox
            key={variantName}
            id={variantName}
            className="mb-4 h-4"
            checked={selectedVariants.includes(variantName)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleSetVariants(e.target.checked, variantName)
              filterStore.setTouched(true)
            }}
          >
            <span>{variantName}</span>

            <span className="text-grey-dark text-10 ml-2">
              {formatNumber(variantValue)} {t('dtree.variants')}
            </span>
          </Checkbox>
        ))
      ) : (
        <div className="flex justify-center items-center text-red-secondary my-2">
          {status || t('condition.noFilters')}
        </div>
      )}
    </>
  </div>
)
