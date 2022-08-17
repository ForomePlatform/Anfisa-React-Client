import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { Divider } from '@ui/divider'

interface IQueryBuilderResultsNumbersProps {
  className?: string
}

export const QueryBuilderResultsNumbers = observer(
  ({ className }: IQueryBuilderResultsNumbersProps) => {
    const {
      totalFilteredCounts,
      isXl,
      dtreeSetData: dtree,
      acceptedVariants,
      rejectedVariants,
    } = dtreeStore
    const { steps } = stepStore

    if (!dtree) {
      return null
    }

    const totalCounts = dtree['total-counts']

    const total = isXl
      ? t('dtree.totalVariants', {
          value: totalCounts[0],
        })
      : `${t('dtree.totalTranscribedVariants', {
          value: totalCounts[1],
        })} (${t('dtree.variantsCount', { value: totalCounts[0] })})`

    return (
      <div className={cn('text-sm font-medium flex align-center', className)}>
        <span className="whitespace-nowrap">{total}</span>
        {steps.length > 0 && totalFilteredCounts && (
          <>
            <Divider orientation="vertical" color="light" spacing="dense" />
            <span className="whitespace-nowrap">
              {t('dtree.accepted', {
                value: totalFilteredCounts.accepted,
              })}
              {!isXl &&
                ` (${t('dtree.variantsCount', { value: acceptedVariants })})`}
            </span>
            <Divider orientation="vertical" color="light" spacing="dense" />
            <span className="whitespace-nowrap">
              {t('dtree.rejected', {
                value: totalFilteredCounts.rejected,
              })}
              {!isXl &&
                ` (${t('dtree.variantsCount', { value: rejectedVariants })})`}
            </span>
            <Divider orientation="vertical" color="light" spacing="dense" />
            <div
              className="text-blue-bright font-medium cursor-pointer"
              onClick={() => dtreeStore.clearAll()}
            >
              {t('general.clearAll')}
            </div>
          </>
        )}
      </div>
    )
  },
)
