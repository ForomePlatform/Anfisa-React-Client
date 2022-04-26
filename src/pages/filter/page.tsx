import React, { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { ErrorPage } from '../error/error'
import { ModalsBlock } from './modals-block'
import { FilterControl } from './ui/filter-control/filter-control'
import { QueryBuilder } from './ui/query-builder/query-builder'

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
      dtreeStore.resetCurrentDtreeName()
      dtreeStore.resetData()
      dirinfoStore.resetData()
      datasetStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsName, history])

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(dirinfoStore.dsinfo.total) as number

      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.variants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcribedVariants') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcribedVariants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcripts') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcripts
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.transcripts
      }
    }
  }

  return (
    <>
      <ModalsBlock />

      <div className="overflow-hidden">
        <Header>
          <VariantsCount
            variantCounts={getFiltersValue('all')}
            transcriptsCounts={getFiltersValue('transcribedVariants')}
            dnaVariantsCounts={getFiltersValue('transcripts')}
            showDnaVariants={!isXL}
            showTranscripts={!isXL}
          />
        </Header>

        <FilterControl />
        <QueryBuilder />
      </div>
    </>
  )
})

export default withErrorBoundary(FilterPage, {
  fallback: <ErrorPage />,
})
