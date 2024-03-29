import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { ExportReport } from '@components/export-report'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { IgvModal } from '@pages/filter/dtree/components/modals/components/igv'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { TCondition } from '@service-providers/common/common.interface'
import { ControlPanel } from './ui/control-panel/control-panel'
import { VariantDrawer } from './ui/variant-drawer'
import { Variants } from './ui/variants'

export const WSPage = observer((): ReactElement => {
  useDatasetName()
  variantStore.observeHistory.useHook()
  filterPresetsStore.observeHistory.useHook()

  const params = useParams()

  const stringifyedConditions = params.get('conditions')
  const { conditions } = filterStore

  const {
    tabReport: { pages },
    fixedStatAmount: { variantCounts, dnaVariantsCounts, transcriptsCounts },
  } = mainTableStore

  const firstVariant = pages[0]?.data?.[0]._no || 0

  const { isVariantShown, variantNo: selectedVariantNo } = variantStore

  useEffect(() => {
    if (stringifyedConditions && !conditions.length) {
      const conditions: TCondition[] = JSON.parse(stringifyedConditions)

      conditions.forEach(condition => filterStore.addCondition(condition))
    }
    variantStore.showVariant(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isVariantShown) {
      variantStore.showVariant(firstVariant)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstVariant])

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

        <IgvModal
          isOpen={modalsVisibilityStore.isIgvModalVisible}
          igvParams={variantStore.record.igvParams}
        />

        <div className="flex-grow flex overflow-hidden">
          <Variants
            className={isVariantShown ? 'w-[380px]' : 'w-full'}
            isDrawerVisible={isVariantShown}
            selectedVariantNo={isVariantShown ? selectedVariantNo : undefined}
          />
          {isVariantShown && <VariantDrawer className="flex-1" />}
        </div>
      </div>
    </>
  )
})
