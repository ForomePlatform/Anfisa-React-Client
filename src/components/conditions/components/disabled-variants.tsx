import { ReactElement } from 'react'

import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Loader } from '@ui/loader'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

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
}: IDisabledVariantsProps): ReactElement => (
  <>
    {isFetching ? (
      <Loader size="s" className="h-6" />
    ) : !status ? (
      <Checkbox id={variantsValue} disabled={true} checked={true}>
        <span data-testid={DecisionTreesResultsDataCy.variantsList}>
          {variantsType}
        </span>

        <span className="text-grey-blue ml-2">
          {variantsValue} {t('dtree.variants')}
        </span>
      </Checkbox>
    ) : (
      <div className="flex justify-center items-center text-red-secondary">
        {status}
      </div>
    )}
  </>
)
