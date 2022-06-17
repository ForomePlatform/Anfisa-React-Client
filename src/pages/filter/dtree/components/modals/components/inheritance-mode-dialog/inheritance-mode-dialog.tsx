import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { Dialog } from '@ui/dialog'
import { InheritanceModeCondition } from '@components/conditions/inheritance-mode'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const InheritanceModeDialog = observer((): ReactElement => {
  const {
    attributeName,
    problemGroups,
    initialVariants,
    initialProblemGroups,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeInheritanceModeDialog()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleSaveChanges = useCallback((values, mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.InheritanceMode,
      values,
      mode,
      param,
    })
    modalsVisibilityStore.closeInheritanceModeDialog()
  }, [])

  const handleAddAttribute = useCallback((action, values, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: values,
      param,
      mode,
    })
    modalsVisibilityStore.closeInheritanceModeDialog()
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isInheritanceModeDialogVisible}
      onClose={modalsVisibilityStore.closeInheritanceModeDialog}
      title={attributeName}
      width="m"
      actions={''}
    >
      <InheritanceModeCondition
        problemGroups={problemGroups}
        initialVariants={initialVariants}
        initialProblemGroups={initialProblemGroups}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ values, hasErrors, param, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeInheritanceModeDialog,
            handleModals,
            disabled: hasErrors,
            saveAttribute: () => handleSaveChanges(values, mode, param),
            addAttribute: action =>
              handleAddAttribute(action, values, mode, param),
          })
        }
      />
    </Dialog>
  )
})
