import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { GeneRegionCondition } from '@components/conditions/gene-region-condition/gene-region-condition'
import { AttributeKinds } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const GeneRegionDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      attributeName,
      initialLocusValue,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { currentStepGroups } = modalsControlStore

    const handleModals = () => {
      modalsVisibilityStore.closeGeneRegionDialog()
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
        modalsVisibilityStore.closeGeneRegionDialog()
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
        modalsVisibilityStore.closeGeneRegionDialog()
      },
      [attributeName, onAddFunc],
    )

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isGeneRegionDialogVisible}
        onClose={modalsVisibilityStore.closeGeneRegionDialog}
        title={attributeName}
        width="m"
        isHiddenActions={true}
      >
        <GeneRegionCondition
          initialLocusValue={initialLocusValue}
          initialMode={initialMode}
          attributeSubKind={attributeSubKind}
          statFuncStore={dtreeStatFuncStore}
          controls={({ hasErrors, param, mode }) =>
            renderAttributeDialogControls({
              initialCondition,
              currentStepGroups,
              onClose: modalsVisibilityStore.closeGeneRegionDialog,
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
