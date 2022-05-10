import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { IDtreeSet } from '@service-providers/decision-trees'

export const QueryBuilderResultsNumbers = observer(() => {
  const dtree: IDtreeSet | undefined = dtreeStore.dtree
  const { stepData, isCountsReceived, totalFilteredCounts, isXl } = dtreeStore

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
    <>
      <span className="whitespace-nowrap">{total}</span>
      {stepData.length > 0 && isCountsReceived && totalFilteredCounts && (
        <>
          <span className="whitespace-nowrap ml-2">
            {t('dtree.accepted', {
              value: totalFilteredCounts.accepted,
            })}
          </span>
          <span className="whitespace-nowrap ml-2">
            {t('dtree.rejected', {
              value: totalFilteredCounts.rejected,
            })}
          </span>
        </>
      )}
    </>
  )
})
