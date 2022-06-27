import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { DEFAULT_COUNT, EnumCondition } from '@components/conditions/enum'
import { AttributeKinds } from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

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

  const paginationHeight =
    enumVariants.length > DEFAULT_COUNT ? 'calc(580px - 249px)' : 'auto'

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
        paginationHeight={paginationHeight}
        controls={({ value, mode }) =>
          renderAttributeDialogControls({
            initialCondition,
            currentStepGroups,
            onClose: modalsVisibilityStore.closeEnumDialog,
            handleModals,
            disabled: value.length === 0,
            saveAttribute: () => handleSaveChanges(mode, value),
            addAttribute: action => handleAddAttribute(action, mode, value),
          })
        }
      />
    </Dialog>
  )
})
