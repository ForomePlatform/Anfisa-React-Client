import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { Dialog } from '@ui/dialog'
import { CompoundHetCondition } from '@components/conditions/compound-het-condition'
import { AttributeKinds } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const CompoundHetDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      attributeName,
      initialApprox,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { isOnDashboard } = dtreeStore

    const { currentStepGroups } = modalsControlStore

    const handleModals = () => {
      modalsVisibilityStore.closeCompoundHetDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleSaveChanges = useCallback(
      (mode, param) => {
        onSaveFunc({
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: ['Proband'],
          mode,
          param,
        })
        modalsVisibilityStore.closeCompoundHetDialog()
      },
      [attributeName, onSaveFunc],
    )

    const handleAddAttribute = useCallback(
      (action, mode, param) => {
        onAddFunc({
          action,
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: ['Proband'],
          param,
          mode,
        })
        modalsVisibilityStore.closeCompoundHetDialog()
      },
      [attributeName, onAddFunc],
    )

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isCompoundHetDialogVisible}
        onClose={modalsVisibilityStore.closeCompoundHetDialog}
        title={attributeName}
        width="m"
        isHiddenActions={true}
      >
        <CompoundHetCondition
          initialApprox={initialApprox}
          initialMode={initialMode}
          attributeSubKind={attributeSubKind}
          statFuncStore={dtreeStatFuncStore}
          controls={({ hasErrors, param, mode }) =>
            renderAttributeDialogControls({
              initialCondition,
              currentStepGroups,
              onClose: modalsVisibilityStore.closeCompoundHetDialog,
              handleModals,
              disabled: hasErrors || isOnDashboard,
              saveAttribute: () => handleSaveChanges(mode, param),
              addAttribute: action => handleAddAttribute(action, mode, param),
            })
          }
        />
      </Dialog>
    )
  },
)
