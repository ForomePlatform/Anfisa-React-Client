import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModalSources } from '@core/enum/modal-sources'
import { useScrollPosition } from '@core/hooks/use-scroll-position'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { UnitsList } from '@components/units-list'
import { DecisionTreesResultsDataCy } from '@data-testid'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'

interface IDtreeUnitsList {
  className?: string
  listContainerId?: string
  isModal: boolean
}

const DtreeUnitsListSubHeader = observer(() => {
  const activeStepIndex = stepStore.steps.findIndex(
    step => step.isActive || step.isReturnedVariantsActive,
  )

  const activeStep = stepStore.steps[activeStepIndex]

  const returnedVariantsPrompt = activeStep?.excluded
    ? ` (${t('dtree.excludedVariants')})`
    : ` (${t('dtree.includedVariants')})`

  const shouldShowVariantsPrompt = Boolean(
    activeStep?.isReturnedVariantsActive || activeStep?.isFinalStep,
  )

  return (
    <div
      className="text-blue-bright font-medium"
      data-testid={DecisionTreesResultsDataCy.resultsTitle}
    >
      {activeStep &&
        (activeStep.isFinalStep
          ? t('dtree.showingResultsForFinalStep')
          : t('dtree.showingResultsForStep') + ' ' + activeStep.step)}
      {shouldShowVariantsPrompt && returnedVariantsPrompt}
    </div>
  )
})

export const DtreeUnitsList = observer(
  ({ className, isModal, listContainerId }: IDtreeUnitsList): ReactElement => {
    const {
      unitGroups,
      functionalUnits,
      isFetching: isFetchingStat,
    } = dtreeStore.stat
    const { isFetching: isFetchingSet } = dtreeStore.dtreeSet

    const [, writeScrollPosition] = useScrollPosition({
      elem: '#attributes-container',
      storageId: 'attributesModalScrollPos',
    })

    const handleUnitSelect = (attribute: TPropertyStatus) => {
      const { kind, name, vgroup } = attribute
      const source = isModal ? ModalSources.TreeStep : ModalSources.TreeStat

      if (isModal) {
        writeScrollPosition()
      }
      dtreeStore.addSelectedGroup([vgroup, name])
      modalsVisibilityStore.closeSelectAttributeDialog()

      if (kind === AttributeKinds.ENUM) {
        modalsVisibilityStore.openEnumDialog(name, undefined, source)
      } else if (kind === AttributeKinds.NUMERIC) {
        modalsVisibilityStore.openNumericDialog(name, undefined, source)
      } else if (kind === AttributeKinds.FUNC) {
        switch (name as FuncStepTypesEnum) {
          case FuncStepTypesEnum.InheritanceMode:
            modalsVisibilityStore.openInheritanceModeDialog(
              name,
              undefined,
              source,
            )
            break
          case FuncStepTypesEnum.CustomInheritanceMode:
            modalsVisibilityStore.openCustomInheritanceModeDialog(
              name,
              undefined,
              source,
            )
            break
          case FuncStepTypesEnum.CompoundHet:
            modalsVisibilityStore.openCompoundHetDialog(name, undefined, source)
            break
          case FuncStepTypesEnum.CompoundRequest:
            modalsVisibilityStore.openCompoundRequestDialog(
              name,
              undefined,
              source,
            )

            break
          case FuncStepTypesEnum.GeneRegion:
            modalsVisibilityStore.openGeneRegionDialog(name, undefined, source)
            break
        }
      }
    }

    return (
      <UnitsList
        className={className}
        isModal={isModal}
        isDark={!isModal}
        withCharts={!isModal}
        subHeader={!isModal && <DtreeUnitsListSubHeader />}
        isLoading={isFetchingSet || isFetchingStat}
        groups={unitGroups}
        functionalUnits={functionalUnits}
        onSelect={handleUnitSelect}
        listContainerId={listContainerId}
        fetchedAmount={dtreeStore.dataReady}
      />
    )
  },
)
