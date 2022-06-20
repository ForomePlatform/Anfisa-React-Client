import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { Dialog } from '@ui/dialog'
import { GeneRegionCondition } from '@components/conditions/gene-region-condition/gene-region-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const GeneRegionDialog = observer((): ReactElement => {
  const {
    attributeName,
    initialLocusValue,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeGeneRegionDialog()
    modalsVisibilityStore.openSelectAttributeDialog()
  }

  const handleSaveChanges = useCallback((mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.GeneRegion,
      values: ['True'],
      mode,
      param,
    })
    modalsVisibilityStore.closeGeneRegionDialog()
  }, [])

  const handleAddAttribute = useCallback((action, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: ['True'],
      param,
      mode,
    })
    modalsVisibilityStore.closeGeneRegionDialog()
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isGeneRegionDialogVisible}
      onClose={modalsVisibilityStore.closeGeneRegionDialog}
      title={attributeName}
      width="m"
      actions={''}
    >
      <GeneRegionCondition
        initialLocusValue={initialLocusValue}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeGeneRegionDialog,
            handleModals,
            disabled: hasErrors,
            saveAttribute: () => handleSaveChanges(mode, param),
            addAttribute: action => handleAddAttribute(action, mode, param),
          })
        }
      />
    </Dialog>
  )
})
