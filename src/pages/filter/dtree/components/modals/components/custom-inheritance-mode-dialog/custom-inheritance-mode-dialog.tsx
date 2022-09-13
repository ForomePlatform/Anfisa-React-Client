import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeDashboard } from '@core/enum/view-type-dashboard-enum'
import { Dialog } from '@ui/dialog'
import { CustomInheritanceModeCondition } from '@components/conditions/custom-inheritance-mode'
import dashboardStore from '@pages/filter/common/dashboard'
import { AttributeKinds } from '@service-providers/common'
import { dtreeStatFuncStore } from '../../../attributes/dtree-stat-func.store'
import { IFuncDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const CustomInheritanceModeDialog = observer(
  ({ funcStore, onAddFunc, onSaveFunc }: IFuncDialogProps): ReactElement => {
    const {
      affectedGroup,
      attributeName,
      problemGroups,
      initialScenario,
      initialMode,
      initialCondition,
      attributeSubKind,
    } = funcStore

    const { currentStepGroups } = modalsControlStore

    const handleModals = () => {
      modalsVisibilityStore.closeCustomInheritanceModeDialog()
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
        modalsVisibilityStore.closeCustomInheritanceModeDialog()
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
        modalsVisibilityStore.closeCustomInheritanceModeDialog()
      },
      [attributeName, onAddFunc],
    )

    const isOnDashboard: boolean =
      dashboardStore.viewType === ViewTypeDashboard.Tile

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isCustomInheritanceModeDialogVisible}
        onClose={modalsVisibilityStore.closeCustomInheritanceModeDialog}
        title={attributeName}
        width="m"
        isHiddenActions={true}
      >
        <CustomInheritanceModeCondition
          affectedGroup={affectedGroup}
          problemGroups={problemGroups}
          initialScenario={initialScenario}
          initialMode={initialMode}
          attributeSubKind={attributeSubKind}
          statFuncStore={dtreeStatFuncStore}
          controls={({ hasErrors, param, mode }) =>
            renderAttributeDialogControls({
              initialCondition,
              currentStepGroups,
              onClose: modalsVisibilityStore.closeCustomInheritanceModeDialog,
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
