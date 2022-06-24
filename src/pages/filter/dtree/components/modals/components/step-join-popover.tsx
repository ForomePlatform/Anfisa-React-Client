import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Popover } from '@ui/popover'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/ws.constants'
import { InstrModifyingActionNames } from '@service-providers/decision-trees'
import modalsVisibilityStore from '../modals-visibility-store'

interface IStepJoinPopoverProps {
  isPopoverOpen: boolean
  popoverAnchor: HTMLElement | null
  handleAddAttribute: (action: ActionType) => void
  closePopover: () => void
}

export const StepJoinPopover = observer(
  ({
    isPopoverOpen,
    popoverAnchor,
    handleAddAttribute,
    closePopover,
  }: IStepJoinPopoverProps): ReactElement => {
    const isReturnedVariants =
      stepStore.activeStepOption === ActiveStepOptions.ReturnedVariants

    const handleJoin = (typeOfJoin: ActionType) => {
      handleAddAttribute(typeOfJoin)
      closePopover()
      modalsVisibilityStore.closeEnumDialog()
      modalsVisibilityStore.closeNumericDialog()
      modalsVisibilityStore.closeModalInheritanceMode()
      modalsVisibilityStore.closeModalCustomInheritanceMode()
    }

    return (
      <Popover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
        offset={popoverOffset}
        placement="bottom"
        className="border border-grey-disabled rounded-md"
      >
        <PopperMenu className="text-14">
          <PopperMenuItem
            onClick={() =>
              handleJoin(
                isReturnedVariants
                  ? InstrModifyingActionNames.UP_JOIN_AND
                  : InstrModifyingActionNames.JOIN_AND,
              )
            }
            data-testid={DecisionTreeModalDataCy.joinByAnd}
            className="rounded-t"
          >
            <span>{t('dtree.joinByAnd')}</span>
          </PopperMenuItem>

          <PopperMenuItem
            onClick={() =>
              handleJoin(
                isReturnedVariants
                  ? InstrModifyingActionNames.UP_JOIN_OR
                  : InstrModifyingActionNames.JOIN_OR,
              )
            }
            data-testid={DecisionTreeModalDataCy.joinByOr}
            className="rounded-b"
          >
            <span>{t('dtree.joinByOr')}</span>
          </PopperMenuItem>
        </PopperMenu>
      </Popover>
    )
  },
)
