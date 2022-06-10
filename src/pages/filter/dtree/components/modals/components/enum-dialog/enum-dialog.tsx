import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { EnumCondition } from '@components/conditions/enum-condition/enum-condition'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'

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
        initialCondition={initialCondition}
        currentStepGroups={currentStepGroups}
        saveEnum={dtreeAttributeStore.saveEnum}
        addEnum={dtreeAttributeStore.addEnum}
        isShowZeroes={dtreeAttributeStore.isShowZeroVariants}
        toggleShowZeroes={dtreeAttributeStore.setIsShowZeroVariants}
      />
    </Dialog>
  )
})
