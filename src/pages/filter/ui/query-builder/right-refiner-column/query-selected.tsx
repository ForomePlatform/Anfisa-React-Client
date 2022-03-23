import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'
import { showToast } from '@utils/notifications/showToast'
import { QueryResults } from './query-results'

export const QuerySelected = observer((): ReactElement => {
  const history = useHistory()
  const params = useParams()

  const { conditions } = filterStore

  const [allVariants, transcribedVariants, allTranscripts] = get(
    datasetStore,
    'statAmount',
    [],
  )

  const selectedVariants =
    conditions.length === 0 ? allVariants : datasetStore.filteredNo.length

  const handleClick = () => {
    let conditionsUrl = ''

    if (conditions.length > 0) {
      conditions.forEach(condition => {
        conditionsUrl += `&refiner=${condition[0]},${condition[1]},${
          condition[2]
        },${condition[3]?.[0] || ''}`
      })
    }

    allVariants > 2600
      ? showToast(t('filter.tooMuchVariants'), 'error')
      : history.push(`${Routes.WS}?ds=${params.get('ds')}${conditionsUrl}`, {
          prevPage: 'refiner',
        })
  }

  return (
    <div className="w-1/3 ">
      <div className="flex items-center px-4 py-3 border-b border-grey-tertiary bg-grey-light">
        <div className="flex flex-wrap">
          <span className="font-bold text-20 w-full">{t('dtree.results')}</span>

          <span className="text-12 leading-14px mt-2">
            {t('filter.variants', {
              all: formatNumber(allVariants),
            })}
          </span>

          {transcribedVariants > 0 && (
            <span className="text-12 leading-14px border-l-2 border-grey-blue mt-2 ml-2 pl-2">
              {t('filter.transcribedVariants', {
                all: formatNumber(transcribedVariants),
              })}
            </span>
          )}

          {allTranscripts > 0 && (
            <span className="text-12 leading-14px border-l-2 border-grey-blue mt-2 ml-2 pl-2">
              {t('filter.transcripts', {
                all: formatNumber(allTranscripts),
              })}
            </span>
          )}
        </div>

        {datasetStore.isXL ? (
          <Button
            className="ml-auto"
            onClick={() => dtreeStore.openTableModal()}
            text={t('dtree.viewVariants')}
          />
        ) : (
          <Button
            className="ml-auto"
            text={t('general.apply', {
              amount: formatNumber(selectedVariants),
            })}
            onClick={handleClick}
          />
        )}
      </div>

      {datasetStore.isLoadingDsStat ? <Loader /> : <QueryResults />}
    </div>
  )
})
