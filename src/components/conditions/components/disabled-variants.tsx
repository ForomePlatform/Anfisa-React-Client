import { ReactElement } from 'react'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { Loader } from '@ui/loader'
import { DecisionTreesResultsDataCy } from '@data-testid'

interface IDisabledVariantsProps {
  isFetching: boolean
  variantsValue: number | undefined
  variantsType: string
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

  return (
    <div className="flex h-5 w-3/4 mb-3">
      {isFetching ? (
        <Loader size="xs" />
      ) : (
        <div>
          <span data-testid={DecisionTreesResultsDataCy.variantsList}>
            {`${variantsType} for`}{' '}
            <span className="text-grey-dark">
              {formatNumber(variantsValue)} {t('dtree.variants')}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
