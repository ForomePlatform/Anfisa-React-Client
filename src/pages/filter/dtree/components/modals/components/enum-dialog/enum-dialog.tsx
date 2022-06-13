import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { EnumCondition } from '@components/conditions/enum/enum-condition'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { SelectModalButtons } from '../ui/select-modal-buttons'

export const EnumDialog = observer((): ReactElement => {
  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
    initialCondition,
  } = dtreeAttributeStore

  const { currentStepGroups } = modalsControlStore

  const handleModals = () => {
    modalsVisibilityStore.closeEnumDialog()
    modalsVisibilityStore.openModalAttribute()
  }

  const handleAddAttribute = useCallback((action, mode, selectedVariants) => {
    addAttributeToStep({
      action,
      attributeType: AttributeKinds.ENUM,
      filters: selectedVariants,
      mode,
    })

    modalsVisibilityStore.closeEnumDialog()
  }, [])

  const handleSaveChanges = useCallback((mode, selectedVariants) => {
    changeEnumAttribute(mode, selectedVariants)
    modalsVisibilityStore.closeEnumDialog()
  }, [])

  return (
    <Dialog
      isOpen={modalsVisibilityStore.isEnumDialogVisible}
      onClose={modalsVisibilityStore.closeEnumDialog}
      title={attributeName}
      width="m"
      actions={''}
    >
      <EnumCondition
        attributeName={attributeName}
        enumVariants={enumVariants}
        attributeSubKind={attributeSubKind}
        initialEnumVariants={initialEnumVariants}
        initialEnumMode={initialEnumMode}
        isShowZeroes={dtreeAttributeStore.isShowZeroVariants}
        toggleShowZeroes={dtreeAttributeStore.setIsShowZeroVariants}
        controls={({ value, mode }) => {
          return initialCondition ? (
            <EditModalButtons
              handleClose={modalsVisibilityStore.closeEnumDialog}
              handleSaveChanges={() => handleSaveChanges(mode, value)}
              disabled={value.length === 0}
            />
          ) : (
            <SelectModalButtons
              currentGroup={currentStepGroups}
              handleClose={modalsVisibilityStore.closeEnumDialog}
              handleModals={handleModals}
              disabled={value.length === 0}
              handleAddAttribute={action =>
                handleAddAttribute(action, mode, value)
              }
            />
          )
        }}
      />
    </Dialog>
  )
})
