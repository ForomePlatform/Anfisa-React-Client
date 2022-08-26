import { ReactElement } from 'react'

import { FuncVariantsTypes } from '@core/enum/func-variants-type-enum'
import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { Loader } from '@ui/loader'
import { DecisionTreesResultsDataCy } from '@data-testid'

interface IDisabledVariantsProps {
  isFetching: boolean
  variantsValue: number | undefined
  variantsType: FuncVariantsTypes
  status: string | undefined
}

export const DisabledVariants = ({
  isFetching,
  variantsValue,
  variantsType,
  status,
}: IDisabledVariantsProps): ReactElement => {
  if (status) {
    return <span>{status}</span>
  }

  const variantString =
    variantsType === FuncVariantsTypes.True
      ? `${variantsType} for`
      : variantsType

  return (
    <div className="flex h-5 w-3/4">
      {isFetching ? (
        <Loader size="xs" />
      ) : (
        <div>
          <span data-testid={DecisionTreesResultsDataCy.variantsList}>
            {variantString}{' '}
            <span className="text-grey-dark">
              {formatNumber(variantsValue)} {t('dtree.variants')}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
