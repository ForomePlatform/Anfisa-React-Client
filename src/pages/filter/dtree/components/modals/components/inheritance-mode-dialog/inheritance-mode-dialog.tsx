import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { InheritanceModeCondition } from '@components/conditions/inheritance-mode'
import { AttributeKinds } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const InheritanceModeDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      attributeName,
      problemGroups,
      initialVariants,
      initialProblemGroups,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { currentStepGroups } = modalsControlStore

    const handleModals = () => {
      modalsVisibilityStore.closeInheritanceModeDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleSaveChanges = useCallback(
      (values, mode, param) => {
        onSaveFunc({
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: values,
          mode,
          param,
        })
        modalsVisibilityStore.closeInheritanceModeDialog()
      },
      [attributeName, onSaveFunc],
    )

    const handleAddAttribute = useCallback(
      (action, values, mode, param) => {
        onAddFunc({
          action,
          attributeKind: AttributeKinds.FUNC,
          attributeName,
          selectedVariants: values,
          param,
          mode,
        })
        modalsVisibilityStore.closeInheritanceModeDialog()
      },
      [attributeName, onAddFunc],
    )

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isInheritanceModeDialogVisible}
        onClose={modalsVisibilityStore.closeInheritanceModeDialog}
        title={attributeName}
        width="m"
        isHiddenActions={true}
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
  },
)
