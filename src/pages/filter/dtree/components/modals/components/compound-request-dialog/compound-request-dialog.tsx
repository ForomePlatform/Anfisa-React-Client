import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import filterStore from '@store/filter'

import dtreeStore from '@store/dtree'
import { Dialog } from '@ui/dialog'
import { CompoundRequestCondition } from '@components/conditions/compound-request/compound-request-condition'
import { AttributeKinds, TFuncArgs } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'
import { ModeTypes } from '@core/enum/mode-types-enum'

export const CompoundRequestDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      affectedGroup,
      problemGroups,
      attributeName,
      initialApprox,
      initialRequestCondition,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { currentStepGroups } = modalsControlStore
    const { isOnDashboard } = dtreeStore

    const handleModals = () => {
      modalsVisibilityStore.closeCompoundRequestDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleSaveChanges = (mode?: ModeTypes, param?: TFuncArgs) => {
      filterStore.stat.abortController?.abort()
      onSaveFunc({
        attributeKind: AttributeKinds.FUNC,
        attributeName,
        selectedVariants: ['True'],
        mode,
        param,
      })
      modalsVisibilityStore.closeCompoundRequestDialog()
    }

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
          affectedGroup={affectedGroup}
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
