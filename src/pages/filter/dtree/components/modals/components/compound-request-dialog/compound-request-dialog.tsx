import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { CompoundRequestCondition } from '@components/conditions/compound-request/compound-request-condition'
import { AttributeKinds } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const CompoundRequestDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      problemGroups,
      attributeName,
      initialApprox,
      initialRequestCondition,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { currentStepGroups } = modalsControlStore

    const handleModals = () => {
      modalsVisibilityStore.closeCompoundRequestDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleSaveChanges = useCallback(
      (mode, param) => {
        onSaveFunc({
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: ['True'],
          mode,
          param,
        })
        modalsVisibilityStore.closeCompoundRequestDialog()
      },
      [attributeName, onSaveFunc],
    )

    const handleAddAttribute = useCallback(
      (action, mode, param) => {
        onAddFunc({
          action,
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: ['True'],
          param,
          mode,
        })
        modalsVisibilityStore.closeCompoundRequestDialog()
      },
      [attributeName, onAddFunc],
    )

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isCompoundRequestDialogVisible}
        onClose={modalsVisibilityStore.closeCompoundRequestDialog}
        title={attributeName}
        width="m"
        className="max-h-70 overflow-y-auto"
        isHiddenActions={true}
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
  },
)
