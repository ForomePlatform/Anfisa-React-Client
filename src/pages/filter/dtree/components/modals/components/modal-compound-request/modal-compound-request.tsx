import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { CompoundRequestCondition } from '@components/conditions/compound-request/compound-request-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { saveAttribute } from '@utils/changeAttribute/saveAttribute'
import { dtreeFunctionsStore } from '../../../attributes/dtree-functions.store'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const ModalCompoundRequest = observer((): ReactElement => {
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
    modalsVisibilityStore.closeModalCompoundRequest()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleSaveChanges = useCallback((mode, param) => {
    saveAttribute({
      filterKind: AttributeKinds.FUNC,
      filterName: FuncStepTypesEnum.CompoundRequest,
      values: ['True'],
      mode,
      param,
    })
    modalsVisibilityStore.closeModalCompoundRequest()
  }, [])

  const handleAddAttribute = useCallback((action, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: ['True'],
      param,
      mode,
    })
    modalsVisibilityStore.closeModalCompoundRequest()
  }, [])

  return (
    <ModalBase minHeight={340} maxHeight="auto">
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalCompoundRequest}
      />

      <CompoundRequestCondition
        problemGroups={problemGroups}
        initialApprox={initialApprox}
        initialRequestCondition={initialRequestCondition}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ hasErrors, param, mode }) => {
          return initialCondition ? (
            <EditModalButtons
              handleClose={modalsVisibilityStore.closeModalCompoundRequest}
              handleSaveChanges={() => handleSaveChanges(mode, param)}
              disabled={hasErrors}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentStepGroups}
              handleClose={modalsVisibilityStore.closeModalCompoundRequest}
              handleModals={handleModals}
              handleModalJoin={modalsVisibilityStore.openModalJoin}
              disabled={hasErrors}
              handleAddAttribute={action =>
                handleAddAttribute(action, mode, param)
              }
            />
          )
        }}
      />
    </ModalBase>
  )
})
