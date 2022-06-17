import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { CompoundHetCondition } from '@components/conditions/compound-het-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const ModalCompoundHet = observer((): ReactElement => {
  const {
    attributeName,
    initialApprox,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = dtreeFunctionsStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeModalCompoundHet()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleSaveChanges = useCallback((mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.CompoundHet,
      values: ['Proband'],
      mode,
      param,
    })
    modalsVisibilityStore.closeModalCompoundHet()
  }, [])

  const handleAddAttribute = useCallback((action, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: ['Proband'],
      param,
      mode,
    })
    modalsVisibilityStore.closeModalCompoundHet()
  }, [])

  return (
    <ModalBase minHeight={340}>
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalCompoundHet}
      />

      <CompoundHetCondition
        initialApprox={initialApprox}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeModalCompoundHet,
            handleModals,
            disabled: hasErrors,
            saveAttribute: () => handleSaveChanges(mode, param),
            addAttribute: action => handleAddAttribute(action, mode, param),
          })
        }
      />
    </ModalBase>
  )
})
