import { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { observer } from 'mobx-react-lite'
import {
  ArrayParam,
  NumberParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import { formatNumber } from '@core/format-number'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import variantStore from '@store/variant'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { ExportPanel } from '@components/export-panel'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { VariantDrawer } from '@components/variant/drawer'
import { ErrorPage } from '@pages/error/error'
import { ModalSaveDataset } from '@pages/filter/ui/query-builder/ui/modal-save-dataset'
import { ControlPanel } from './ui/control-panel'
import { ModalNotes } from './ui/modal-notes'
import { TableVariants } from './ui/table-variants'

const WSPage = observer((): ReactElement => {
  const params = useParams()

  useDatasetName()

  const [query] = useQueryParams({
    variant: NumberParam,
    refiner: withDefault(ArrayParam, []),
  })

  const { variant, refiner } = query

  const hasConditionsInSearchParamsOnly =
    refiner.length > 0 && datasetStore.conditions.length === 0

  Number.isInteger(variant) && variantStore.setIndex(variant as number)

  useEffect(() => {
    if (hasConditionsInSearchParamsOnly) {
      // TODO: need refactoring in FOROME-765
      const conditions: any[] = (refiner as string[]).map((c: string) => {
        const item: string[] = c!.split(',')
        const [name, group, symbol, value] = item

        return [name, group, symbol, [value]]
      })

      datasetStore.setConditionsAsync(conditions)
    }

    const initAsync = async () => {
      const dsName = params.get('ds') || ''

      if (dsName && !variantStore.dsName) {
        variantStore.setDsName(params.get('ds') ?? '')
      }

      await datasetStore.initDatasetAsync(dsName)
    }

    initAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { statAmount } = datasetStore

  const variantCounts = statAmount?.[0] ?? null
  const dnaVariantsCounts = statAmount?.[1] ?? null
  const transcriptsCounts = statAmount?.[2] ?? null

  return (
    <Fragment>
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

      {variantStore.isModalNotesVisible && <ModalNotes />}

      <div className="h-full flex flex-col">
        <Header>
          <div className="text-white flex-grow flex justify-end pr-6">
            <span
              className="text-12 leading-14px text-white mt-2 ml-auto font-bold"
              data-testid={MainTableDataCy.numVariants}
            >
              {t('filter.variants', {
                all: formatNumber(variantCounts),
              })}
            </span>

            <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 font-bold">
              {t('filter.transcribedVariants', {
                all: formatNumber(dnaVariantsCounts),
              })}
            </span>

            <span className="text-12 leading-14px text-white border-l-2 border-blue-lighter mt-2 ml-2 pl-2 mr-6 font-bold">
              {t('filter.transcripts', {
                all: formatNumber(transcriptsCounts),
              })}
            </span>

            <PopperButton
              ButtonElement={ExportReportButton}
              ModalElement={ExportPanel}
            />
          </div>
        </Header>

        <ControlPanel />

        <div className="flex-grow flex overflow-hidden">
          <TableVariants />

          <VariantDrawer />
        </div>
      </div>
    </Fragment>
  )
})

export default withErrorBoundary(WSPage, {
  fallback: <ErrorPage />,
})
