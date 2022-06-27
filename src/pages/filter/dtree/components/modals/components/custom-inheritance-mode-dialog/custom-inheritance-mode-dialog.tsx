import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { Dialog } from '@ui/dialog'
import { CustomInheritanceModeCondition } from '@components/conditions/custom-inheritance-mode'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const CustomInheritanceModeDialog = observer((): ReactElement => {
  const {
    attributeName,
    problemGroups,
    initialScenario,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeCustomInheritanceModeDialog()
    modalsVisibilityStore.openSelectAttributeDialog()
  }

  const handleSaveChanges = useCallback((mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.CustomInheritanceMode,
      values: ['True'],
      mode,
      param,
    })
    modalsVisibilityStore.closeCustomInheritanceModeDialog()
  }, [])

  const handleAddAttribute = useCallback((action, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: ['True'],
      param,
      mode,
    })
    modalsVisibilityStore.closeCustomInheritanceModeDialog()
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isCustomInheritanceModeDialogVisible}
      onClose={modalsVisibilityStore.closeCustomInheritanceModeDialog}
      title={attributeName}
      width="m"
      isHiddenActions={true}
    >
      <CustomInheritanceModeCondition
        problemGroups={problemGroups}
        initialScenario={initialScenario}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeCustomInheritanceModeDialog,
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
