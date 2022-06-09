import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeCondition } from '@components/conditions/inheritance-mode-condition/inheritance-mode-condition'
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

export const ModalInheritanceMode = observer((): ReactElement => {
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
    modalsVisibilityStore.closeModalInheritanceMode()
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
    modalsVisibilityStore.closeModalInheritanceMode()
  }, [])

  const handleAddAttribute = useCallback((action, values, mode, param) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.FUNC,
      filters: values,
      param,
      mode,
    })
    modalsVisibilityStore.closeModalInheritanceMode()
  }, [])

  return (
    <ModalBase minHeight={340}>
      <HeaderModal
        groupName={attributeName}
        handleClose={modalsVisibilityStore.closeModalInheritanceMode}
      />

      <InheritanceModeCondition
        problemGroups={problemGroups}
        initialVariants={initialVariants}
        initialProblemGroups={initialProblemGroups}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={dtreeStatFuncStore}
        controls={({ values, hasErrors, param, mode }) => {
          return initialCondition ? (
            <EditModalButtons
              handleClose={modalsVisibilityStore.closeModalInheritanceMode}
              handleSaveChanges={() => handleSaveChanges(values, mode, param)}
              disabled={hasErrors}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentStepGroups}
              handleClose={modalsVisibilityStore.closeModalInheritanceMode}
              handleModals={handleModals}
              handleModalJoin={modalsVisibilityStore.openModalJoin}
              disabled={hasErrors}
              handleAddAttribute={action =>
                handleAddAttribute(action, values, mode, param)
              }
            />
          )
        }}
      />
    </ModalBase>
  )
})
