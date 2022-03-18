import React, { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Header } from '@components/header'
import { GlbPagesNames } from '@glb/glb-names'
import { ErrorPage } from '../error/error'
import { ModalsBlock } from './modals-block'
import { FilterControl } from './ui/filter-control/filter-control'
import { QueryBuilder } from './ui/query-builder/query-builder'
import { getNumberWithCommas } from './ui/query-builder/ui/next-step-route'

const FilterPage = observer((): ReactElement => {
  const isXL = datasetStore.isXL

  const history = useHistory()

  useDatasetName()
  const params = useParams()
  const dsName = params.get('ds') || ''

  useEffect(() => {
    const initAsync = async () => {
      const body = new URLSearchParams({
        ds: dsName,
        tm: '0',
        code: 'return False',
      })

      await dirinfoStore.fetchDsinfoAsync(dsName)

      await dtreeStore.fetchDtreeSetAsync(body)
    }

    initAsync()

    return () => {
      dtreeStore.resetFilterValue()
      dtreeStore.resetAlgorithmFilterValue()
      dtreeStore.resetData()
      dirinfoStore.resetData()
      datasetStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsName, history])

  const { statAmount } = datasetStore

  const variantCounts = statAmount?.[0] ?? null
  const dnaVariantsCounts = statAmount?.[1] ?? null
  const transcriptsCounts = statAmount?.[2] ?? null

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(dirinfoStore.dsinfo.total)

      if (filterStore.method === GlbPagesNames.Filter) {
        return getNumberWithCommas(toJS(dtreeStore.statAmount[0]))
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return getNumberWithCommas(variantCounts)
      }
    }

    if (type === 'transcribedVariants') {
      if (filterStore.method === GlbPagesNames.Filter) {
        return getNumberWithCommas(toJS(dtreeStore.statAmount[1]))
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return getNumberWithCommas(dnaVariantsCounts)
      }
    }

    if (type === 'transcripts') {
      if (filterStore.method === GlbPagesNames.Filter) {
        return getNumberWithCommas(toJS(dtreeStore.statAmount[2]))
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return getNumberWithCommas(toJS(transcriptsCounts))
      }
    }
  }

  return (
    <Fragment>
      <ModalsBlock />

      <div className="overflow-hidden">
        <Header>
          <div className="text-white flex-grow flex justify-end pr-6">
            <span className="text-12 leading-14px text-white mt-2 ml-auto font-bold">
              {t('filter.variants', {
                all: getFiltersValue('all'),
              })}
            </span>

            {!isXL && (
              <React.Fragment>
                <span className="header-variants-info">
                  {t('filter.transcribedVariants', {
                    all: getFiltersValue('transcribedVariants'),
                  })}
                </span>

                <span className="header-variants-info">
                  {t('filter.transcripts', {
                    all: getFiltersValue('transcripts'),
                  })}
                </span>
              </React.Fragment>
            )}
          </div>
        </Header>

        <FilterControl />
        <QueryBuilder />
      </div>
    </Fragment>
  )
})

export default withErrorBoundary(FilterPage, {
  fallback: <ErrorPage />,
})
