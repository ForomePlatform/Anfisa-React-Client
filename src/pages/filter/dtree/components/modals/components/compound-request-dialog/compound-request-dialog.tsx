import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { Dialog } from '@ui/dialog'
import { CompoundRequestCondition } from '@components/conditions/compound-request/compound-request-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const CompoundRequestDialog = observer((): ReactElement => {
  const {
    problemGroups,
    attributeName,
    initialApprox,
    initialRequestCondition,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeCompoundRequestDialog()
    modalsVisibilityStore.openSelectAttributeDialog()
  }

  const handleSaveChanges = useCallback((mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.CompoundRequest,
      values: ['True'],
      mode,
      param,
    })
    modalsVisibilityStore.closeCompoundRequestDialog()
  }, [])

  const handleAddAttribute = useCallback((action, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: ['True'],
      param,
      mode,
    })
    modalsVisibilityStore.closeCompoundRequestDialog()
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isCompoundRequestDialogVisible}
      onClose={modalsVisibilityStore.closeCompoundRequestDialog}
      title={attributeName}
      width="m"
      actions={''}
      className="max-h-70 overflow-y-auto"
    >
      <CompoundRequestCondition
        problemGroups={problemGroups}
        initialApprox={initialApprox}
        initialRequestCondition={initialRequestCondition}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeCompoundRequestDialog,
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
