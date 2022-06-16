import { ReactElement, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { NumberParam, useQueryParams } from 'use-query-params'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { TCondition } from '@service-providers/common/common.interface'
import { ControlPanel } from './ui/control-panel/control-panel'
import { TableVariants } from './ui/table/table-variants'
import { VariantDrawer } from './ui/variant-drawer'

export const WSPage = observer((): ReactElement => {
  const params = useParams()
  const stringifyedConditions = params.get('conditions')
  const { conditions } = filterStore

  useDatasetName()

  const [query] = useQueryParams({
    variant: NumberParam,
  })

  const { variant } = query

  Number.isInteger(variant) && variantStore.setIndex(variant as number)

  useEffect(() => {
    if (stringifyedConditions && !conditions.length) {
      const conditions: TCondition[] = JSON.parse(stringifyedConditions)

      conditions.forEach(condition => filterStore.addCondition(condition))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    mainTableStore.fixedStatAmount

  const isDrawerVisible = variantStore.isDrawerVisible

  return (
    <>
      <div className="h-full flex flex-col">
        <Header>
          <VariantsCount
            variantCounts={variantCounts}
            transcriptsCounts={transcriptsCounts}
            dnaVariantsCounts={dnaVariantsCounts}
          >
            <ExportReport />
          </VariantsCount>
        </Header>

        <ControlPanel />

        <div className="flex-grow flex overflow-hidden">
          <TableVariants className={cn(!isDrawerVisible && 'w-full')} />
          {isDrawerVisible && <VariantDrawer className="flex-1" />}
        </div>
      </div>
    </>
  )
})
