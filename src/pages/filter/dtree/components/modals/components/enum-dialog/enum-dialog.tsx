import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { Dialog } from '@ui/dialog'
import { DEFAULT_COUNT, EnumCondition } from '@components/conditions/enum'
import dashboardStore from '@pages/filter/common/dashboard'
import { AttributeKinds } from '@service-providers/common'
import { dtreeAttributeStore } from '../../../attributes/dtree-attributes.store'
import { IEnumDialogProps } from '../../modals.interfaces'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { renderAttributeDialogControls } from '../ui/renderAttributeControls'

export const EnumDialog = observer(
  ({
    attributeStore,
    onAddEnum,
    onSaveEnum,
  }: IEnumDialogProps): ReactElement => {
    const {
      attributeStatus,
      attributeName,
      enumVariants,
      attributeSubKind,
      initialEnumVariants,
      initialEnumMode,
      initialCondition,
    } = attributeStore

    const { currentStepGroups } = modalsControlStore
    const { selectedEnumVariants } = dashboardStore
    const initialVariants = initialEnumVariants || selectedEnumVariants

    const handleClose = () => {
      modalsVisibilityStore.closeEnumDialog()
      dashboardStore.resetEnumVariant()
    }

    const handleModals = () => {
      modalsVisibilityStore.closeEnumDialog()
      modalsVisibilityStore.openSelectAttributeDialog()
    }

    const handleAddAttribute = useCallback(
      (action, mode, selectedVariants) => {
        onAddEnum({
          action,
          attributeKind: AttributeKinds.ENUM,
          attributeName,
          selectedVariants,
          mode,
        })
        handleClose()
        modalsVisibilityStore.closeEnumDialog()
      },
      [attributeName, onAddEnum],
    )

    const handleSaveChanges = useCallback(
      (mode, selectedVariants) => {
        onSaveEnum({
          attributeKind: AttributeKinds.ENUM,
          attributeName,
          selectedVariants,
          mode,
        })
        handleClose()
        modalsVisibilityStore.closeEnumDialog()
      },
      [attributeName, onSaveEnum],
    )

    const listHeight =
      enumVariants.length > DEFAULT_COUNT ? 'calc(580px - 319px)' : 'auto'

    return (
      <Dialog
        isOpen={modalsVisibilityStore.isEnumDialogVisible}
        onClose={handleClose}
        title={attributeName}
        width="m"
        isHiddenActions={true}
        style={{ top: '50%' }}
      >
        <EnumCondition
          selectedAttributeStatus={attributeStatus}
          attributeName={attributeName}
          enumVariants={enumVariants}
          attributeSubKind={attributeSubKind}
          initialVariants={initialVariants}
          initialEnumMode={initialEnumMode}
          isShowZeroes={dtreeAttributeStore.isShowZeroVariants}
          isDataReady={!attributeStatus?.incomplete}
          toggleShowZeroes={dtreeAttributeStore.setIsShowZeroVariants}
          listHeight={listHeight}
          selectedDashboardVariants={selectedEnumVariants}
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
  },
)
